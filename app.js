'use strict';

const Http = require('http');
const Express = require('express');
const BodyParser = require('body-parser');

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.post('/api/messages', function (req, res) {
	res.status(201).json(req.body.data);
});

module.exports = app;

