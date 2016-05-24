const Express = require('express');
const HttpStatus = require('http-status');

const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();

Router
  .post('/', (req, res) => {
    res.format({
      'application/json' () {
        const data = req.body.data;

        if (!data.message.code || !data.user.email) {
          console.log(`Bad request: ${data}`);
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json(Utils.createStatusResponse(HttpStatus.BAD_REQUEST));
        }

        User
          .findOne({user: { email: data.user.email }, message: { code: data.message.code }})
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

            _user.verified = true;
            return _user.save();
          })
          .then((doc) => {
            res
              .status(HttpStatus.ACCEPTED)
              .json({ data: doc });
          })
          .catch(() => {
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
