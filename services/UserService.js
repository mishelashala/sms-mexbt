const Mongoose = require('mongoose');
const User = require('../databases/').models.user;

Mongoose.Promise = Promise;

function findOneByEmail(email) {
  return User
    .findOne({ email })
    .exec()
}

module.exports = {
  findOneByEmail
}