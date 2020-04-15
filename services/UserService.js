const Mongoose = require('mongoose');
const UserModel = require('../databases/').models.user;

Mongoose.Promise = Promise;

async function findOneByEmailOrCreate(email) {
  let user = await UserModel.findOne({ email }).exec();

  if (!user) {
    user = new User(data);
  }

  return user
}

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
  findOneByEmailOrCreate,
  markAsVerified,
  UserServiceError,
}