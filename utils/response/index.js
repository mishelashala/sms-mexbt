'use strict';

const HttpStatus = require('http-status');
const ClientStatus = require('../client-status');

const create = ({ http, client, data }) => {
  const response = {};

  switch (http) {
    case HttpStatus.CREATED:
      response.server = {
        status: HttpStatus.CREATED,
        message: 'Created'
      };
      break;

    case HttpStatus.ACCEPTED:
      response.server = {
        status: HttpStatus.ACCEPTED,
        message: 'Accepted'
      };
      break;

    case HttpStatus.BAD_REQUEST:
      response.server = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad Request'
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

    case HttpStatus.NOT_FOUND:
      response.server = {
        status: HttpStatus.NOT_FOUND,
        message: 'Not Found'
      };
      break;

    case HttpStatus.INTERNAL_SERVER_ERROR:
      response.server = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error'
      };
      break;
  }

  switch (client) {
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

    case ClientStatus.USER_VERIFIED:
      response.client = {
        status: ClientStatus.USER_VERIFIED,
        message: 'User Verified'
      };
      break;

    case ClientStatus.USER_NOT_FOUND:
      response.client = {
        status: ClientStatus.USER_NOT_FOUND,
        message: 'User Not Found'
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
  }

  if (!!data === true) {
    response.data = data;
  }

  return response;
};

module.exports = { create };
