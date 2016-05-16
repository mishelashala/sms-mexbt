'use strict';

const Http = require('http');
const Express = require('express');
const BodyParser = require('body-parser');
const Twilio = require('twilio');
const cuid = require('cuid');

const app = Express();

const keys = require('./keys');
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.get('/api/', function (req, res) {
	res.status(300).json({
		status: 300,
		message: "Bad Request"
	});
});

app.get('/api/verify', function (req, res) {
	res.status(300).json({ status: 300, message: "Bad Request" });
});

app.post('/api/verify', function (req, res) {
	const number = Number(req.body.data.phone.number);
	const region = Number(req.body.data.phone.region);

	// we need to save the confirmation code into a database
	const code = cuid();

	if (number == NaN || region == NaN) {
		return res.status(300).json({ status: 300, message: "Bad Request" });
	} 

	client.messages.create({
		to: `${region}${number}`,
		from: keys.phone_number,
		message: code
	}, function (err, message) {
		if (err) {
			return res.status(500).json({ status: 500, message: "Internal error" });
		}

		const res_message = req.body.data;
		res_message.message = {
			status: send,
			sid: message.sid
		};

		res.status(201).json(res_message);
	});
});

module.exports = app;

