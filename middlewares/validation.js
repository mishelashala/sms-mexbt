const HttpStatus = require('http-status');
const Valid = require('../utils/valid')
const Datadog = require('../utils/datadog');

/*!
 * Validates the message received
 */
function validateMessageData(req, res, next) {
  const data = req.body

  if (!Valid.verification(data)) {
    Datadog.report('verify_message', 'invalid_user_input')

    const responseObject = Response.create({
      http: HttpStatus.BAD_REQUEST,
      client: ClientStatus.INVALID_USER_INPUT
    })

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(responseObject)
  }

  next()
}

module.exports = {
  validateMessageData
}