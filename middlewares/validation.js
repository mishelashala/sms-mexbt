const HttpStatus = require("http-status");
const Valid = require("../utils/valid");
const Datadog = require("../utils/datadog");
const ClientStatus = require("../utils/client/status");

/*!
 * Validates the message received
 */
function validateVerificationData(req, res, next) {
  const data = req.body;

  if (!Valid.verification(data)) {
    Datadog.report("verify_message", "invalid_user_input");

    const responseObject = Response.create({
      http: HttpStatus.BAD_REQUEST,
      client: ClientStatus.INVALID_USER_INPUT,
    });

    return res.status(HttpStatus.BAD_REQUEST).json(responseObject);
  }

  next();
}

function validateUserData(req, res, next) {
  const data = req.body;

  if (!Valid.message(data)) {
    Datadog.report("send_message", "invalid_user_input");

    const responseObject = Response.create({
      http: HttpStatus.BAD_REQUEST,
      client: ClientStatus.INVALID_USER_INPUT,
    });

    return res.status(HttpStatus.BAD_REQUEST).json(responseObject);
  }

  next();
}

module.exports = {
  validateVerificationData,
  validateUserData,
};
