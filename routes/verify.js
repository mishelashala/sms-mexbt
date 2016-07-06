'use strict';

const Express = require('express');
const HttpStatus = require('http-status');
const Axios = require('axios');

const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();
const datadog = Utils.datadog;

Router
  .post('/', (req, res) => {
    /*!
     * Content negotiation (REST)
     */

    res.format({
      'application/json' () {
        /*!
         * Store the data from request body
         */

        const data = req.body.data;

        if (!data.message.code || !data.user.email) {
          datadog('verify_message', 'invalid_user_input');

          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
        }

        /*!
         * Search one user in the database using the email as query
         */

        User
          .findOne({ user: { email: data.user.email } })
          .exec()
          .then((_user) => {
            if (!_user) {
              datadog('verify_message', 'invalid_user_email');

              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
            }

            if (_user.message.code !== data.message.code) {
              datadog('verify_message', 'invalid_user_code');

              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
            }

            if (_user.verified === true) {
              datadog('verify_message', 'user_already_verified');

              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
            }

            /*!
             * Change user verified status and then save
             * the changes in the database.
             */

            _user.verified = true;
            _user
              .save()
              .then((doc) => {
                /*
                 * Report to datadog
                 */

                datadog('verify_message', 'user_verified');

                /*!
                 * Login To Alphapoint
                 */

                return Axios.post('https://sim.mexbt.com:8451/ajax/v1/Login', {
                    "adminUserId": "william",
                    "password": "william123"
                  });
              })
              .then((response) => {
                /*!
                 * If login was successfull return response
                 */

                if (response.data.isAccepted === true) {
                  return response.data;
                }

                /*!
                 * If login was not successfull return error
                 */

                return Promise.reject({ message: 'Alphapoint Auth' });
              })
              .then((data) => {
                /*!
                 * Change user verification level
                 */

                return Axios.post('https://sim.mexbt.com:8451/ajax/v1/SetUserVerificationLevel', {
                  sessionToken: data.sessionToken,
                  UserId: _user.user.email,
                  VerificationLevel: "3"
                });
              })
              .then((response) => {
                /*!
                 * If verification level changed response 202 Accepted
                 */

                if (response.data.isAccepted === true) {
                  res
                    .status(HttpStatus.ACCEPTED)
                    .json({
                      status: {
                        code: HttpStatus.ACCEPTED,
                        message: 'Accepted'
                      }
                    });
                }

                return Promise.reject({ message: 'Alphapoint Change VerificationLevel' });
              })
              .catch((err) => {
                if (err.message === 'Alphapoint Auth') {
                  datadog('verify_message', 'alphapoint_auth');
                } else if (err.message === 'Alphapoint Change VerificationLevel') {
                  datadog('verify_message', 'alphapoint_change_verification_level')
                } else {
                  datadog('verify_message', 'error_database_verifying_user');
                }

                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json(Utils.createStatusResponse(HttpStatus.INTERNAL_SERVER_ERROR));
              });
          })
          .catch(() => {
            datadog('verify_message', 'error_database_connection');
          });
      },

      /*!
       * If the Accept header is different from application/json
       * this code is executed
       */

      default () {
        datadog('verify_message', 'bad_content_negotiation');

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
    datadog('verify_message', 'method_not_allowed');

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  })

  .put('/', (req, res) => {
    datadog('verify_message', 'method_not_allowed');

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  })

  .delete('/', (req, res) => {
    datadog('verify_message', 'method_not_allowed');

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createStatusResponse(HttpStatus.METHOD_NOT_ALLOWED));
  });

module.exports = Router;
