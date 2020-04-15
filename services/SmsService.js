const Twilio = require("twilio");
const keys = require("../keys");

const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

function sendTextMessage({ phone, message }) {
  return new Promise((resolve, reject) => {
    client.messages.create(
      {
        to: `+${phone}`,
        from: keys.twilio_phone_number,
        body: message,
      },
      (err) => {
        /*!
         * If something went wrong reject the promise
         */
        if (err) {
          return reject("could_not_send_sms");
        }

        resolve();
      }
    );
  });
}

module.exports = {
  sendTextMessage,
};
