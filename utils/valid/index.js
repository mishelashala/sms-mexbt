'use strict';

const message = (data) => {
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

const verificationData = () => {
};

module.exports = { message, verificationData };
