'use strict';

const Cuid = require('cuid');

module.exports = function (body) {
  return {
    phone: {
      region: Number(body.data.phone.region),
      number: Number(process.env.TEST_PHONE_NUMBER) || Number(body.data.phone.number)
    },
    message: {
      code: String(process.env.TEST_VERIFY_CODE) || Cuid().slice(0, 8)
    },
    user: {
      email: String(body.data.user.email)
    }
  };
};
