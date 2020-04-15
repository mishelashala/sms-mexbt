const Mongoose = require('mongoose');
const User = require('../databases/').models.user;

Mongoose.Promise = Promise;

/*!
 * Searches for the the user
 * if it finds it, returns the user object
 * otherwise it throws an exception
 */
function markAsVerified({ code, email }) {
  const updated_at = Date.now()
  const verified = true
  const user = await UserModel({ code, email }, { $set: { updated_at, verified } }).exec()

  if (!user) {
    throw new Error(UserServiceError.NotFound)
  }

  return user
}

module.exports = {
  markAsVerified,
  UserServiceError,
}