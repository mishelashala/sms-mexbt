'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const EmailSchema = new Schema({
  phone: {
    region: {
      type: Number,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  user: {
    email: {
      type: String,
      required: true
    }
  },
  message: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: ture
    }
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = EmailSchema;
