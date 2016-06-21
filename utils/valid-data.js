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
    data.phone.region.length === 2 &&
    data.phone.number.length === 10 &&
    !!String(data.user.email) !== false
  );
};
