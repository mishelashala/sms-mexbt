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
    res.format({
      'application/json' () {
        const data = req.body.data;

        if (!data.message.code || !data.user.email) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
        }

        User
          .findOne({user: { email: data.user.email }})
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

            _user.verified = true;
            _user
              .save()
              .then((doc) => {
                datadog.increment('mexbt.verification.verified');
                res
                  .status(HttpStatus.ACCEPTED)
                  .json({ data: doc });
              });
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
