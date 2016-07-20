'use strict';

const HttpStatus = require('http-status');
const ClientResponse = require('../client-response');

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

  if (!!client) {
    response.client = ClientResponse.create(client);
  }

  if (!!data) {
    response.data = data;
  }

  return response;
};

module.exports = { create };
