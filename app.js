'use strict';

const Express = require('express');
const BodyParser = require('body-parser');
// const Mongoose = require('mongoose');
// const Dogapi = require('dogapi');
const HttpStatus = require('http-status');

const Utils = require('./utils');
const messagesRoute = require('./routes/').messages;

const app = Express();
// const Email = require('./db/').models.email;

// Mongoose.connect(keys.mongo_uri);
// Dogapi.initialize(keys.datadog_config);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use('/api/messages/', messagesRoute);

app.use((req, res) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .json(Utils.createError(HttpStatus.NOT_FOUND));
});

module.exports = app;
