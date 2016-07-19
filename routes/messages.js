'use strict';

const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');
const Mongoose = require('mongoose');

const Response = require('../utils/response');
const ClientStatus = require('../utils/client-status');
const keys = require('../keys');
const User = require('../databases/').models.user;
const Datadog = require('../utils/datadog');
const Format = require('../utils/format');
const Valid = require('../utils/valid');

const Router = Express.Router();
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

Mongoose.Promise = Promise;

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

        const data = Format.message(req.body);

        /*!
         * If some field is missing...
         */

        if (!Valid.message(data)) {
          Datadog.report('send_message', 'invalid_user_input');

          const responseObject = Response.create({
            http: HttpStatus.BAD_REQUEST,
            client: ClientStatus.INVALID_USER_INPUT
          });

          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(responseObject);
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
                Datadog.report('send_message', 'error_sending_sms');

                const responseObject = Response.create({
                  http: HttpStatus.INTERNAL_SERVER_ERROR,
                  client: ClientStatus.MESSAGE_NOT_SENT
                });

                return res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json(responseObject);
              }

              /*!
               * Report to datadog message sent.
               * Set code message to user and verified to false
               */

              Datadog.report('send_message', 'message_sent');
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
                  Datadog.report('send_message', 'message_database_saved');

                  const responseObject = Response.create({
                    http: HttpStatus.CREATED,
                    client: ClientStatus.MESSAGE_SENT,
                    data: _user
                  });

                  res
                    .status(HttpStatus.CREATED)
                    .json(responseObject);
                })
                .error(() => {
                  Datadog.report('send_message', 'error_database_registering_user');

                  const responseObject = Response.create({
                    http: HttpStatus.INTERNAL_SERVER_ERROR,
                    client: ClientStatus.MESSAGE_NOT_SENT
                  });

                  res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(responseObject);
                });
            });
          })
          .catch(() => {
            Datadog.report('send_message', 'error_database_connection');

            const responseObject = Response.create({
              http: HttpStatus.INTERNAL_SERVER_ERROR,
              client: ClientStatus.DATABASE_CONNECTION_FAILED
            });

            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(responseObject);
          });
      },

      /*!
       * If the Accept header is different from application/json
       * this code is executed
       */

      default () {
        Datadog.report('send_message', 'bad_content_negotiation');

        const responseObject = Response.create({
          http: HttpStatus.NOT_ACCEPTABLE
        });

        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(responseObject);
      }
    });
  })

  /*!
   * The rest of the HTTP Verbs are not allowed
   */

  .get('/', (req, res) => {
    Datadog.report('send_message', 'method_not_allowed');

    const responseObject = Response.create({
      http: HttpStatus.METHOD_NOT_ALLOWED
    });

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(responseObject);
  })

  .put('/', (req, res) => {
    Datadog.report('send_message', 'method_not_allowed');

    const responseObject = Response.create({
      http: HttpStatus.METHOD_NOT_ALLOWED
    });

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(responseObject);
  })

  .delete('/', (req, res) => {
    Datadog.report('send_message', 'method_not_allowed');

    const responseObject = Response.create({
      http: HttpStatus.METHOD_NOT_ALLOWED
    });

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(responseObject);
  });

module.exports = Router;
