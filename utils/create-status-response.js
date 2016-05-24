'use strict';

const HttpStatus = require('http-status');

module.exports = function (error) {
  switch (error) {
    case HttpStatus.BAD_REQUEST:
      return { error: { status: HttpStatus.BAD_REQUEST, message: 'Bad Request' } };
    case HttpStatus.NOT_ACCEPTABLE:
      return { error: { status: HttpStatus.NOT_ACCEPTABLE, message: 'Not Acceptable' } };
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return { error: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' } };
    case HttpStatus.NOT_FOUND:
      return { error: { status: HttpStatus.NOT_FOUND, message: 'Not Found' } };
    case HttpStatus.METHOD_NOT_ALLOWED:
      return { error: { status: HttpStatus.METHOD_NOT_ALLOWED, message: 'Method Not Allowed' } };
  }
};
