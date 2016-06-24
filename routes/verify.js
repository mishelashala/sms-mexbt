'use strict';

const Express = require('express');
const HttpStatus = require('http-status');

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

                res
                  .status(HttpStatus.ACCEPTED)
                  .json({ data: doc });
              });
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
