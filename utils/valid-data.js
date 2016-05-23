'use strict';

module.exports = function (data) {
  return (
    data.phone.number !== 0 &&
    data.phone.region !== 0 &&
    isNaN(data.user.email)
  );
};
