const { MessagesRouterFactory } = require("./messages");
const { VerifyRouterFactory } = require("./verify");
const userService = require("../services/UserService");
const smsService = require("../services/SmsService");
const alphapointService = require("../services/AlphaPointService");

const messages = MessagesRouterFactory({
  userService,
  smsService,
});

const verify = VerifyRouterFactory({ userService, alphapointService });

module.exports = {
  messages,
  verify,
};
