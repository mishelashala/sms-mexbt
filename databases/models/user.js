const Mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

const UserModel = Mongoose.model('users', UserSchema);

module.exports = UserModel;
