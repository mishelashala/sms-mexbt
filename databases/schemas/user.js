const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  code: {
    required: true,
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = UserSchema;
