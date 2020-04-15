const HttpStatus = require("http-status");

const create = (http) => {
  switch (http) {
    case HttpStatus.CREATED:
      return {
        status: HttpStatus.CREATED,
        message: "Created",
      };

    case HttpStatus.ACCEPTED:
      return {
        status: HttpStatus.ACCEPTED,
        message: "Accepted",
      };

    case HttpStatus.BAD_REQUEST:
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Bad Request",
      };

    case HttpStatus.NOT_ACCEPTABLE:
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: "Not Acceptable",
      };

    case HttpStatus.METHOD_NOT_ALLOWED:
      return {
        status: HttpStatus.METHOD_NOT_ALLOWED,
        message: "Method Not Allowed",
      };

    case HttpStatus.NOT_FOUND:
      return {
        status: HttpStatus.NOT_FOUND,
        message: "Not Found",
      };

    case HttpStatus.INTERNAL_SERVER_ERROR:
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      };
  }
};

module.exports = { create };
