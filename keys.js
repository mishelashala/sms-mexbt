'use strict';

module.exports = {
	account_sid: process.env.TWILIO_ACCOUNT_SID,
	auth_token: process.env.TWILIO_AUTH_TOKEN,
	phone_number: process.env.TWILIO_PHONE_NUMBER,
	mongo_uri: `mongodb://${process.env.MONGOLAB_USER}:${process.env.MONGOLAB_PASS}@ds023902.mlab.com:23902/${process.env.MONGOLAB_DATABASE}'
};

