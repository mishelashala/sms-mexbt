'use strict';

const HttpStatus = require('http-status');
const ClientResponse = require('../client/response');
const ServerResponse = require('../server/response');

const create = ({ http, client, data }) => {
  const response = {};

  if (!!http) {
    response.server = ServerResponse.create(http);
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
