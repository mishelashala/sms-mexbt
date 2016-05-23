const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');

const keys = require('../keys');
const Utils = require('../utils');

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
            .json(Utils.createError(HttpStatus.BAD_REQUEST));
        }

        client.messages.create({
          to: `${data.phone.region}${data.phone.number}`,
          from: keys.phone_number,
          body: data.message.code
        }, (err, message) => {
          if (err) {
            return res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(Utils.createError(HttpStatus.INTERNAL_SERVER_ERROR));
          }

          data.message.status = message.status;

          res
            .status(HttpStatus.CREATED)
            .json({ data });
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
    res.format({
      'application/json' () {
        res
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
      },
      default () {
        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(Utils.createError(HttpStatus.NOT_ACCEPTABLE));
      }
    });
  })
  .put('/', (req, res) => {
    res.format({
      'application/json' () {
        res
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
      },
      default () {
        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(Utils.createError(HttpStatus.NOT_ACCEPTABLE));
      }
    });
  })
  .delete('/', (req, res) => {
    res.format({
      'application/json' () {
        res
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
      },
      default () {
        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(Utils.createError(HttpStatus.NOT_ACCEPTABLE));
      }
    });
  });

module.exports = Router;
