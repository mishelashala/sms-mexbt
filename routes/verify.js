'use strict';

const Express = require('express');
const HttpStatus = require('http-status');
const Statsd = require('node-dogstatsd').StatsD;

const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();
const datadog = new Statsd('localhost', 8125);

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
              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
            }

            if (_user.message.code !== data.message.code) {
              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
            }

            if (_user.verified === true) {
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

                datadog.increment('mexbt.verification.verified');

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
