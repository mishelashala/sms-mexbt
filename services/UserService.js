const Mongoose = require('mongoose');
const User = require('../databases/').models.user;

Mongoose.Promise = Promise;

const UserServiceError = {
  CouldNotVerify: 'error_database_verifying_user',
  UserNotFound: 'user_not_found'
}

async function findOneByEmailAndCode({ code, email }) {
  const user = await User
    .findOne({ code, email })
    .exec()

  if (!user) {
    throw new Error(UserServiceError.UserNotFound)
  }

  return user
}

module.exports = {
  findOneByEmailAndCode,
  UserServiceError,
}