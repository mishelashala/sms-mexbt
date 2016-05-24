'use strict';

const Cuid = require('cuid');

module.exports = function (body) {
  return {
    phone: {
      region: Number(body.data.phone.region),
      number: Number(body.data.phone.number)
    },
    message: {
      code: process.env.TEST_TELEPHONE_NUMBER || Cuid().slice(0, 8)
    },
    user: {
      email: String(body.data.user.email)
    }
  };
};
