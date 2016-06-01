'use strict';

const Cuid = require('cuid');

/*!
 * Takes the body and format its data
 * @param {Object} - Body Request
 * @return {Object} - Data formated
 */

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
