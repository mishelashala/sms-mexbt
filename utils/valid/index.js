'use strict';

const message = (data) => {
  if (data.phone === undefined) {
    return false;
  }

  if (data.phone.number === undefined) {
    return false;
  }

  if (data.phone.region === undefined) {
    return false;
  }

  if (data.phone.number.length !== 10) {
    return false;
  }

  if (data.user === undefined) {
    return false;
  }

  if (data.user.email === undefined) {
    return false;
  }

  return true;
};

const verification = (data) => {
  if (data.message === undefined) {
    return false;
  }

  if (data.message.code === undefined) {
    return false;
  }

  if (data.message.code.length !== 6) {
    return false;
  }

  if (data.user === undefined) {
    return false;
  }

  if (data.user.email === undefined) {
    return false;
  }

  return true;
};

module.exports = { message, verification };
