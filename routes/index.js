const { MessagesRouterFactory } = require('./messages')
const userService = require("../services/UserService");
const smsService = require('../services/SmsService')

const messages = MessagesRouterFactory({
  userService,
  smsService
})

module.exports = {
  messages,
  verify: require("./verify"),
};
