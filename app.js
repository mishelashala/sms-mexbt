const Express = require('express');
const BodyParser = require('body-parser');
const HttpStatus = require('http-status');
const Mongoose = require('mongoose');
const cors = require('cors');

const Response = require('./utils/response');
const messagesRoute = require('./routes/').messages;
const verifyRoute = require('./routes/').verify;

const app = Express();

Mongoose.connect(require('./databases').uri);

/*!
 * Always create a JSON representation of the
 * body request
 */
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(cors());

/*!
 * Routing (endpoints)
 */
app.use('/api/messages/', messagesRoute);
app.use('/api/verify', verifyRoute);

/*!
 * Not Found Middleware
 * If the route is not defined in the routers,
 * this middleware will be called
 */
app.use((_req, res) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .json(Response.create({ http: HttpStatus.NOT_FOUND }));
});

module.exports = app;
