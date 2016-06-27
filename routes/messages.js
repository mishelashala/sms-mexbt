'use strict';

const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');

const keys = require('../keys');
const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

const datadog = Utils.datadog;

Router
  .post('/', (req, res) => {
    /*!
    * Content negotiation (REST)
    */
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
          datadog('send_message', 'invalid_user_input');

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
          .then((_user) => {
            /*!
             * Send the message using twilio library
             */

            client.messages.create({
              to: `+${data.phone.region}${data.phone.number}`,
              from: keys.twilio_phone_number,
              body: data.message.code
            }, (err, msg) => {
              /*!
               * If something went wrong report to datadog and
               * send a error response
               */

              if (err) {
                datadog('send_message', 'error_sending_sms');

                return res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json({
                    error: {
                      status: HttpStatus.INTERNAL_SERVER_ERROR,
                      message: 'Internal Server Error'
                    },
                    twilio: {
                      err: err
                    }
                  });
              }

              /*!
               * Report to datadog message sent.
               * Set code message to user and verified to false
               */

              datadog('send_message', 'message_sent');
              _user.message.code = data.message.code;
              _user.verified = false;

              /*!
               * Save the user, if is not in the data base
               * upsert (create the user) and then
               * send the response
               */

              _user
                .save({ upsert: true })
                .then((doc) => {
                  datadog('send_message', 'message_database_saved');
                  res.status(HttpStatus.CREATED).json({ data: _user });
                })
                .error(() => {
                  datadog('send_message', 'error_database_registering_user');

                  res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(Util.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
                });
            });
          })
          .catch(() => {
            datadog('send_message', 'error_database_connection');

            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(Util.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
          });
      },

      /*!
       * If the Accept header is different from application/json
       * this code is executed
       */

      default () {
        datadog('send_message', 'bad_content_negotiation');

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
    datadog('send_message', 'method_not_allowed');

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  })

  .put('/', (req, res) => {
    datadog('send_message', 'method_not_allowed');

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  })

  .delete('/', (req, res) => {
    datadog('send_message', 'method_not_allowed');

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  });

module.exports = Router;
