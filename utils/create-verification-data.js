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
      region: body.data.phone.region,
      number: body.data.phone.number
    },
    message: {
      code: process.env.TEST_VERIFY_CODE || Cuid().slice(0, 8)
    },
    user: {
      email: body.data.user.email
    }
  };
};
