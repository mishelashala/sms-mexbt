'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const EmailSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = EmailSchema;
