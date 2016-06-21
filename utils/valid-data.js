'use strict';

/*!
 * Takes the request body data and validates it
 * @param {Object} - Data to validate
 * @return {Boolean} - The data is valid or not
 */

module.exports = function (data) {
  return (
    !!String(data.phone.number) !== false &&
    !!String(data.phone.region) !== false &&
    data.phone.number.length === 10 &&
    !!String(data.user.email) !== false &&
    data.user.email !== null &&
    data.phone.region !== null &&
    data.phone.number !== null &&
    data.user.email !== undefined &&
    data.phone.number !== undefined &&
    data.phone.region !== undefined
  );
};
