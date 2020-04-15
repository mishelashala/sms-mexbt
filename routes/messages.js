const Express = require("express");
const HttpStatus = require("http-status");
const Mongoose = require("mongoose");
const Cuid = require("cuid");

const Response = require("../utils/response");
const ClientStatus = require("../utils/client/status");
const User = require("../databases/").models.user;
const Datadog = require("../utils/datadog");
const validateUserData = require("../middlewares/validation");

const Router = Express.Router();

Mongoose.Promise = Promise;

Router.post("/", validateUserData, async (req, res) => {
  /*!
   * #createVerificationData takes the body of the request
   * and return a formated object
   */

  const data = req.body;

  /*!
   * Search one result from the database using
   * the email as query
   */

  try {
    let _user = await User.findOne({ email: data.email }).exec();

    if (!_user) {
      _user = new User(data);
    }

    /*!
     * Send the message using twilio library
     */

    data.code = Cuid().slice(0, 8);

    await SmsService.sendTextMessage({
      phone,
      message: data.code,
    });

    /*!
     * Report to datadog message sent.
     * Set code message to user and verified to false
     */

    Datadog.report("send_message", "message_sent");

    /*!
     * Add verification code to user and flag it as
     * unverified
     */

    _user.code = data.code;
    _user.verified = false;

    /*!
     * Save the user, if is not in the data base
     * upsert (create the user) and then
     * send the response
     */

    await _user.save({ upsert: true });

    /*!
     * Notify to datadog message was sent
     */

    Datadog.report("send_message", "message_database_saved");

    const responseObject = Response.create({
      http: HttpStatus.CREATED,
      client: ClientStatus.MESSAGE_SENT,
      data: _user,
    });

    res.status(HttpStatus.CREATED).json(responseObject);
  } catch (err) {
    let http;

    switch (err.message) {
      case "could_not_send_sms":
        Datadog.report("send_message", "error_sending_sms");
        http = HttpStatus.INTERNAL_SERVER_ERROR;
        client = HttpStatus.MESSAGE_NOT_SENT;
        break;
      default:
        Datadog.report("send_message", "error_database_connection");
        http = HttpStatus.INTERNAL_SERVER_ERROR;
        client = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    const responseObject = Response.create({
      http,
      client,
    });

    res.status(http).json(responseObject);
  }
});

module.exports = Router;
