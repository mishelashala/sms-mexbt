const Express = require("express");
const HttpStatus = require("http-status");
const Twilio = require("twilio");
const Mongoose = require("mongoose");
const Cuid = require("cuid");

const Response = require("../utils/response");
const ClientStatus = require("../utils/client/status");
const keys = require("../keys");
const User = require("../databases/").models.user;
const Datadog = require("../utils/datadog");
const validateUserData = require("../middlewares/validation");

const Router = Express.Router();
const client = new Twilio.RestClient(keys.account_sid, keys.auth_token);

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

    data.code = keys.verification_code || Cuid().slice(0, 8);

    client.messages.create(
      {
        to: `+${data.phone}`,
        from: keys.twilio_phone_number,
        body: data.code,
      },
      (err, msg) => {
        /*!
         * If something went wrong report to datadog and
         * send a error response
         */

        if (err) {
          Datadog.report("send_message", "error_sending_sms");
          console.log("twilio error:", err.message);

          const responseObject = Response.create({
            http: HttpStatus.INTERNAL_SERVER_ERROR,
            client: ClientStatus.MESSAGE_NOT_SENT,
          });

          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseObject);
        }

        /*!
         * Report to datadog message sent.
         * Set code message to user and verified to false
         */

        Datadog.report("send_message", "message_sent");
        _user.code = data.code;
        _user.verified = false;

        /*!
         * Save the user, if is not in the data base
         * upsert (create the user) and then
         * send the response
         */

        _user
          .save({ upsert: true })
          .then((doc) => {
            Datadog.report("send_message", "message_database_saved");

            const responseObject = Response.create({
              http: HttpStatus.CREATED,
              client: ClientStatus.MESSAGE_SENT,
              data: _user,
            });

            res.status(HttpStatus.CREATED).json(responseObject);
          })
          .catch(() => {
            Datadog.report("send_message", "error_database_registering_user");

            const responseObject = Response.create({
              http: HttpStatus.INTERNAL_SERVER_ERROR,
              client: ClientStatus.MESSAGE_NOT_SENT,
            });

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObject);
          });
      }
    );
  } catch (err) {
    Datadog.report("send_message", "error_database_connection");

    const responseObject = Response.create({
      http: HttpStatus.INTERNAL_SERVER_ERROR,
      client: ClientStatus.DATABASE_CONNECTION_FAILED,
    });

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObject);
  }
});

module.exports = Router;
