'use strict';

const Express = require('express');
const BodyParser = require('body-parser');
const Twilio = require('twilio');
const cuid = require('cuid');
const Logger = require('morgan');
const Mongoose = require('mongoose');

const app = Express();

const keys = require('./keys');
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);
const Email = require('./db').models.email;

Mongoose.connect(keys.mongo_uri);

app.use(Logger('tiny'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.post('/api/messages', function (req, res) {
  const number = Number(req.body.data.phone.number);
  const region = Number(req.body.data.phone.region);

  const verificationCode = cuid();

  if (isNaN(number) || isNaN(region)) {
    return res.status(300).json({ status: 300, message: 'Bad Request' });
  }

  client.messages.create({
    to: `${region}${number}`,
    from: keys.phone_number,
    body: verificationCode
  }, function (err, message) {
    if (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
    const email = new Email({
      code: verificationCode,
      email: req.body.data.user.email
    });
    email.save(function (err) {
      if (err) {
        return res.status(500).json({ status: 500, message: err.message });
      }
      const resMessage = req.body.data; 
      resMessage.message = {
        status: message.status,
        sid: message.sid
      };
      res.status(201).json(resMessage);
    });
  });
});

app.use(function (req, res) {
  res.status(300).json({ status: 300, message: 'Bad Request' });
});

module.exports = app;

