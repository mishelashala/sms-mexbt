const Express = require('express');
const HttpStatus = require('http-status');
const Twilio = require('twilio');
const Mongoose = require('mongoose');

const keys = require('../keys');
const Utils = require('../utils');
const User = require('../databases/').models.user;

const Router = Express.Router();

Router
  .post('/', (req, res) => {
    
  })
  .get('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
  })
  .put('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
  })
  .delete('/', (req, res) => {
    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(Utils.createError(HttpStatus.METHOD_NOT_ALLOWED));
  });

module.exports = Router;
