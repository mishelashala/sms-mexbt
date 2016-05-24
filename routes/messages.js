const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');
const Mongoose = require('mongoose');

const keys = require('../keys');
const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

Router
  .post('/', (req, res) => {
    res.format({
      'application/json' () {
        const data = Utils.createVerificationData(req.body);

        if (!Utils.validData(data)) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
        }

        User
          .findOne({ user: { email: data.user.email }})
          .exec()
          .then((user) => {
            if (!user) {
              return new User(data);
            };

            return user;
          })
          .then((__user) => {
            if (__user.verified) {
              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
            }

            client.messages.create({
              to: `${data.phone.region}${data.phone.number}`,
              from: keys.phone_number,
              body: data.message.code
            }, (err, msg) => {
              if (err) {
                return res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json(Utils.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
              }

              __user.message.code = data.message.code;

              __user
                .save()
                .then((doc) => {
                  res.status(HttpStatus.CREATED).json({ data: doc });
                })
                .catch((err) => {
                  res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(Utils.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
                });
            });
          })
          .catch((err) => {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(Utils.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
          });
      },
      default () {
        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(Utils.createStatusResponse(HttpStatus.NOT_ACCEPTABLE));
      }
    });
  })
  .get('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  })
  .put('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  })
  .delete('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  });

module.exports = Router;
