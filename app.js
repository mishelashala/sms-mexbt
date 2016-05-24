'use strict';

const Express = require('express');
const BodyParser = require('body-parser');
const HttpStatus = require('http-status');
const Mongoose = require('mongoose');

const Utils = require('./utils');
const messagesRoute = require('./routes/').messages;
const verifyRoute = require('./routes/').verify;

const app = Express();

Mongoose.connect('mongodb://localhost/mexbt-emails');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use('/api/messages/', messagesRoute);
app.use('/api/verify', verifyRoute);

app.use((req, res) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .json(Utils.createStatusResponse(HttpStatus.NOT_FOUND));
});

module.exports = app;
