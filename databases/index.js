const keys = require('../keys');

module.exports = {
  models: {
    user: require('./models/user.js')
  },
  schemas: {
    user: require('./schemas/user.js')
  },
  uri: `mongodb://${keys.db_user}:${keys.db_pass}@${keys.db_host}:${keys.db_port}/${keys.db_name}`
};
