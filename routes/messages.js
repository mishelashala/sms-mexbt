const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');
const Mongoose = require('mongoose');

const keys = require('../keys');
const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

Mongoose.connect('mongodb://localhost/mexbt-emails');

Router
  .post('/', (req, res) => {
    res.format({
      'application/json' () {
        const data = Utils.createVerificationData(req.body);

        if (!Utils.validData(data)) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(Utils.createError(HttpStatus.BAD_REQUEST));
        }

        User
          .findOne({ user: { email: data.user.email }}).exec()
          .then((user) => {
            if (!user) {
              return new User({
                phone: {
                  number: data.phone.number,
                  region: data.phone.region
                },
                user: {
                  email: data.user.email
                },
                message: {
                  code: data.message.code
                }
              });
            };

            return user;
          })
          .then((__user) => {
            client.messages.create({
              to: `${data.phone.region}${data.phone.number}`,
              from: keys.phone_number,
              body: data.message.code
            }, (err, msg) => {
              if (err) {
                return res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json(Utils.createError(HttpStatus.INTERNAL_SERVER_ERROR));
              }

              const newData = { message: { code: data.message.code }};
              const options = { upsert: true };

              User
                .findOneAndUpdate({ user: { email: __user.user.email }}, newData, options)
                .exec()
                .then((doc) => res.status(HttpStatus.CREATED).json({ data }))
                .catch((err) => {
                  console.log('something went wrong');
                  res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(Utils.createError(HttpStatus.INTERNAL_SERVER_ERROR));
                });
            });
          })
          .catch((err) => {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(Utils.createError(HttpStatus.INTERNAL_SERVER_ERROR));
          });
      },
      default () {
        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(Utils.createError(HttpStatus.NOT_ACCEPTABLE));
      }
    });
  })
  .get('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
  })
  .put('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
  })
  .delete('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
  });

module.exports = Router;
