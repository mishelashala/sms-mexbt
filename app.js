'use strict';

const Http = require('http');
const Express = require('express');
const BodyParser = require('body-parser');
const Twilio = require('twilio');
const cuid = require('cuid');

const app = Express();

const keys = require('./keys');
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);
//const Email = require('./db').models.email;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.post('/api/messages', function (req, res) {
	const number = Number(req.body.data.phone.number);
	const region = Number(req.body.data.phone.region);

	// we need to save the confirmation code into a database
	const verification_code = cuid();

	if (number == NaN || region == NaN) {
		return res.status(300).json({ status: 300, message: "Bad Request" });
	}

	//const email = new Email({
	//	code: verification_code,
	//	email: req.body.data.user.email,
	//	session_id: req.body.data.user.session_id
	//});

	client.messages.create({
		to: `${region}${number}`,
		from: keys.phone_number,
		body: verification_code
	}, function (err, message) {
		if (err) {
			return res.status(500).json({ status: 500, message: err.message });
		}

		//email.save(function (err) {
		//	if (err) {
		//		return res.status(500).json({ status: 500, message: err.message })
		//	}

			const res_message = req.body.data;
			res_message.message = {
				status: message.status,
				sid: message.sid
			};

			res.status(201).json(res_message);
		//});
	});
});

app.use(function (req, res) {
	res.status(300).json({ status: 300, message: "Bad Request" });
});

module.exports = app;

