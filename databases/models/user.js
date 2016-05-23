'use strict';

const Mongoose = require('mongoose');
const EmailSchema = require('../schemas/email');

const EmailModel = Mongoose.model('users', EmailSchema);

module.exports = EmailModel;
