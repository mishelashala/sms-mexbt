'use strict';

module.exports = {
  models: {
    user: require('./models/user.js')
  },
  schemas: {
    user: require('./schemas/user.js')
  },
  uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
};
