const Mongoose = require('mongoose');
const User = require('../databases/').models.user;

Mongoose.Promise = Promise;

const UserServiceError = {
  CouldNotVerify: 'error_database_verifying_user',
  AlreadyVerified: 'user_already_verified',
  NotFound: 'user_not_found'
}

async function findOneByEmailAndCode({ code, email }) {
  const user = await User
    .findOne({ code, email })
    .exec()

  if (!user) {
    throw new Error(UserServiceError.NotFound)
  }

  if (user.verified) {
    // @TODO: remove this verification, instead remove record from database
    // and return message saying 'toke not valid'
    throw new Error(UserServiceError.AlreadyVerified)
  }

  return user
}

module.exports = {
  findOneByEmailAndCode,
  UserServiceError,
}