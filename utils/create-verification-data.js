'use strict';

const Cuid = require('cuid');

const keys = require('../keys');

/*!
 * Takes the body and format its data
 * @param {Object} - Body Request
 * @return {Object} - Data formated
 */

module.exports = function (body) {
  return {
    phone: {
      region: body.phone.region,
      number: body.phone.number
    },
    message: {
      code: keys.verification_code || Cuid().slice(0, 8)
    },
    user: {
      email: body.user.email
    }
  };
};
