'use strict';

const Mongoose = require('mongoose');
const EmailSchema = require('../schemas/email');

const EmailModel = Mongoose.model('emails', EmailSchema);

module.exports = EmailModel;

