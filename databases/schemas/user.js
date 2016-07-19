'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    region: {
      type: String
    },
    number: {
      type: String
    }
  },
  user: {
    email: {
      type: String
    }
  },
  message: {
    code: {
      type: String
    }
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = UserSchema;
