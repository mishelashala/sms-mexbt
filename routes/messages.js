const Express = require("express");
const HttpStatus = require("http-status");
const Cuid = require("cuid");

const Response = require("../utils/response");
const ClientStatus = require("../utils/client/status");
const Datadog = require("../utils/datadog");
const validateUserData = require("../middlewares/validation");
const UserService = require("../services/UserService");

const MessageRouter = Express.Router();

MessageRouter.post("/", validateUserData, async (req, res) => {
  try {
    /*!
     * #createVerificationData takes the body of the request
     * and return a formated object
     */

    const data = req.body;

    /*!
     * Search one result from the database using
     * the email as query
     */

    const user = UserService.findOneByEmailOrCreate(data.email);

    data.code = Cuid().slice(0, 8);

    /*!
     * Send the message using twilio library
     */

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

    user.code = data.code;
    user.verified = false;

    /*!
     * Save the user, if is not in the data base
     * upsert (create the user) and then
     * send the response
     */

    await user.save({ upsert: true });

    /*!
     * Notify to datadog message was sent
     */

    Datadog.report("send_message", "message_database_saved");

    const responseObject = Response.create({
      http: HttpStatus.CREATED,
      client: ClientStatus.MESSAGE_SENT,
      data: user,
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

module.exports = MessageRouter;
