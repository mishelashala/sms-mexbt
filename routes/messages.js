'use strict';

const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');
const Statsd = require('node-dogstatsd').StatsD;

const keys = require('../keys');
const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);
const datadog = new Statsd('localhost', 8125);

Router
  /*!
   * Content negotiation (REST)
   */
  .post('/', (req, res) => {
    res.format({
      'application/json' () {
        /*!
         * #createVerificationData takes the body of the request
         * and return a formated object
         */
        const data = Utils.createVerificationData(req.body);

        /*!
         * If some field is missing...
         */
        if (!Utils.validData(data)) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
        }

        /*!
         * Search one result from the database using
         * the email as query
         */
        User
          .findOne({user: { email: data.user.email }})
          .exec()
          .then((user) => {
            if (!user) {
              return new User(data);
            }

            return user;
          })
          .then((__user) => {
            /*!
             * Send the message using twilio library
             */
            client.messages.create({
              to: `${data.phone.region}${data.phone.number}`,
              from: keys.phone_number,
              body: data.message.code
            }, (err, msg) => {
              /*!
               * If something went wrong report to datadog and
               * send a error response
               */
              if (err) {
                datadog.increment('mexbt.verification.not_sent');

                return res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json(Utils.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
              }

              /*!
               * Report to datadog message sent.
               * Set code message to user and verified to false
               */
              datadog.increment('mexbt.verification.sent');
              __user.message.code = data.message.code;
              __user.verified = false;

              /*!
               * Save the user, if is not in the data base
               * upsert (create the user) and then
               * send the response
               */
              __user
                .save({ upsert: true })
                .then((doc) => {
                  res.status(HttpStatus.CREATED).json({ data: __user });
                });
            });
          });
      },
      /*!
       * If the Accept header is different from application/json
       * this code is executed
       */
      default () {
        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(Utils.createStatusResponse(HttpStatus.NOT_ACCEPTABLE));
      }
    });
  })

  /*!
   * The rest of the HTTP Verbs are not allowed
   */
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
