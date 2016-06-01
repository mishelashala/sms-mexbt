'use strict';

/*!
 * Takes the request body data and validates it
 * @param {Object} - Data to validate
 * @return {Boolean} - The data is valid or not
 */
module.exports = function (data) {
  return (
    data.phone.number !== 0 &&
    data.phone.region !== 0 &&
    isNaN(data.user.email)
  );
};
