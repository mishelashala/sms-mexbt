'use strict';

const ClientStatus = require('./status');

const create = (status) => {
  switch (status) {
    case ClientStatus.MESSAGE_SENT:
      return {
        status: ClientStatus.MESSAGE_SENT,
        message: 'Message Sent'
      };

    case ClientStatus.MESSAGE_NOT_SENT:
      return {
        status: ClientStatus.MESSAGE_NOT_SENT,
        message: 'Message Not Sent'
      };

    case ClientStatus.USER_VERIFIED:
      return {
        status: ClientStatus.USER_VERIFIED,
        message: 'User Verified'
      };

    case ClientStatus.USER_NOT_FOUND:
      return {
        status: ClientStatus.USER_NOT_FOUND,
        message: 'User Not Found'
      };

    case ClientStatus.INVALID_USER_INPUT:
      return {
        status: ClientStatus.INVALID_USER_INPUT,
        message: 'Invalid User Input'
      };

    case ClientStatus.INVALID_VERIFICATION_CODE:
      return {
        status: ClientStatus.INVALID_VERIFICATION_CODE,
        message: 'Invalid Verification Code'
      };

    case ClientStatus.USER_ALREADY_VERIFIED:
      return {
        status: ClientStatus.USER_ALREADY_VERIFIED,
        message: 'User Already Verified'
      };

    case ClientStatus.DATABASE_CONNECTION_FAILED:
      return {
        status: ClientStatus.DATABASE_CONNECTION_FAILED,
        message: 'Database Connection Failed'
      };

    case ClientStatus.CANNOT_AUTH_TO_ALPHAPOINT:
      return {
        status: ClientStatus.CANNOT_AUTH_TO_ALPHAPOINT,
        message: 'Cannot Auth To Alphapoint'
      };

    case ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL:
      return {
        status: ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL,
        message: 'Cannot Change Verification Level'
      };
  }
};

module.exports = { create };
