// Successful
const MESSAGE_SENT = 10;
const USER_VERIFIED = 11;

// User Error
const INVALID_USER_INPUT = 20;
const USER_NOT_FOUND = 21;
const INVALID_VERIFICATION_CODE = 22;
const USER_ALREADY_VERIFIED = 23;

// Application Error
const MESSAGE_NOT_SENT = 30;
const DATABASE_CONNECTION_FAILED = 31;

// Alphapoint Error
const CANNOT_AUTH_TO_ALPHAPOINT = 40;
const CANNOT_CHANGE_VERIFICATION_LEVEL = 41;

module.exports = {
  MESSAGE_SENT,
  USER_VERIFIED,

  INVALID_USER_INPUT,
  USER_NOT_FOUND,
  INVALID_VERIFICATION_CODE,
  USER_ALREADY_VERIFIED,

  MESSAGE_NOT_SENT,
  DATABASE_CONNECTION_FAILED,

  CANNOT_AUTH_TO_ALPHAPOINT,
  CANNOT_CHANGE_VERIFICATION_LEVEL,
};
