const Mongoose = require('mongoose');
const User = require('../databases/').models.user;

Mongoose.Promise = Promise;

const UserServiceError = {
  CouldNotVerify: 'error_database_verifying_user',
  UserNotFound: 'user_not_found'
}

function findOneByEmail(email) {
  return User
    .findOne({ email })
    .exec()
}

module.exports = {
  findOneByEmail,
  UserServiceError,
}