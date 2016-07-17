'use strict';

const HttpStatus = require('http-status');
const ClientStatus = require('./client-status');

const create = (httpCode, clientCode, data) => {
  const response = {};

  switch (httpCode) {
    case HttpStatus.OK:
      response.server = {
        status: HttpStatus.OK,
        message: 'OK'
      };
      break;

    case HttpStatus.CREATED:
      response.server = {
        status: HttpStatus.CREATED,
        message: 'Created'
      };
      break;

    case HttpStatus.NOT_ACCEPTABLE:
      response.server = {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Not Acceptable'
      };
      break;

    case HttpStatus.METHOD_NOT_ALLOWED:
      response.server = {
        status: HttpStatus.METHOD_NOT_ALLOWED,
        message: 'Method Not Allowed'
      };
      break;

    case HttpStatus.INTERNAL_SERVER_ERROR:
      response.server = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error'
      };
      break;

    default:
      break;
  }

  switch (clientCode) {
    case ClientStatus.MESSAGE_SENT:
      response.client = {
        status: ClientStatus.MESSAGE_SENT,
        message: 'Message Sent'
      };
      break;

    case ClientStatus.MESSAGE_NOT_SENT:
      response.client = {
        status: ClientStatus.MESSAGE_NOT_SENT,
        message: 'Message Not Sent'
      };
      break;

    case ClientStatus.EMAIL_EMPTY:
      response.client = {
        status: ClientStatus.EMAIL_EMPTY,
        message: 'User Error: Email cannot be empty'
      };
      break;

    case ClientStatus.CODE_EMPTY:
      response.client = {
        status: ClientStatus.CODE_EMPTY,
        message: 'User Error: Code cannot be empty'
      };
      break;

    case ClientStatus.USER_VERIFIED:
      response.client = {
        status: ClientStatus.USER_VERIFIED,
        message: 'User Verified'
      };
      break;

    case ClientStatus.INVALID_USER_INPUT:
      response.client = {
        status: ClientStatus.INVALID_USER_INPUT,
        message: 'Invalid User Input'
      };
      break;

    case ClientStatus.INVALID_VERIFICATION_CODE:
      response.client = {
        status: ClientStatus.INVALID_VERIFICATION_CODE,
        message: 'Invalid Verification Code'
      };
      break;

    case ClientStatus.USER_ALREADY_VERIFIED:
      response.client = {
        status: ClientStatus.USER_ALREADY_VERIFIED,
        message: 'User Already Verified'
      };
      break;

    case ClientStatus.DATABASE_CONNECTION_FAILED:
      response.client = {
        status: ClientStatus.USER_ALREADY_VERIFIED,
        message: 'Database Connection Failed'
      };
      break;

    case ClientStatus.CANNOT_AUTH_TO_ALPHAPOINT:
      response.client = {
        status: ClientStatus.CANNOT_AUTH_TO_ALPHAPOINT,
        message: 'Cannot Auth To Alphapoint'
      };
      break;

    case ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL:
      response.client = {
        status: ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL,
        message: 'Cannot Change Verification Level'
      };
      break;

    default:
      break;
  }

  if (!!data === true) {
    response.data = data;
  }

  return response;
};

module.exports = { create };
