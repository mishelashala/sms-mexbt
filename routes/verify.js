const Express = require('express');
const HttpStatus = require('http-status');

const { validateMessageBody } = require('../middlewares/validation')
const AlphapointService, { AlphapointServiceError } = require('../services/AlphaPointService')
const UserService, { UserServiceError } = require('../services/UserService')
const ClientStatus = require('../utils/client/status');
const Datadog = require('../utils/datadog');
const Response = require('../utils/response');

const VerifyRouter = Express.Router();

export const LogType = {
  VerifyMessage: 'verify_message',
}

export const LogVerifyMessageType = {
  AlphapointAuth: 'alphapoint_auth',
  BadContentNegotiation: 'bad_content_negotiation',
  CouldNotChangeAlphapointVerificationLevel: 'could_not_change_alphapoint_verification_level',
  DatabaseConnectionError: 'error_database_connection',
  InternalServerError: 'internal_server_error',
  InvalidUserEmail: 'invaliduser_email',
  InvalidUserCode: 'invaliduser_code',
  MethodNotAllowed: 'method_not_allowed',
  UserVerified: 'user_verified'
}

VerifyRouter
  .post('/', validateMessageBody, async (req, res) => {
    try {
      /*!
        * Store the data from request body
        */

      const { code, email } = req.body;

      /*!
        * Attempt to mark the user as verified on our database
        */

      const user = await UserService.markAsVerified({ code, email })

      /*!
        * Attempt to auth to alphapoint service
        */

      const { sessionToken } = await AlphapointService.auth()

      /*!
        * Attempt to change user verification level
        */

      await AlphapointService.verifyUser({ token: sessionToken, email: user.email })

      /*!
        * Report to datadog
        */

      Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.UserVerified);

      /*!
        * If everything went fine respond with 202 Accepted
        */

      const responseObject = Response.create({
        http: HttpStatus.ACCEPTED,
        client: ClientStatus.USER_VERIFIED,
        data: user
      });

      return res
        .status(HttpStatus.ACCEPTED)
        .json(responseObject);
    } catch(err) {
      let clientStatus;
      let http;

      /*!
        * Handle client status and message
        */

      switch (err.message) {
        case AlphapointServiceError.CouldNotAuth:
          Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.AlphapointAuth);
          clientStatus = ClientStatus.ALPHAPOINT_CANNOT_AUTH;
          http = HttpStatus.INTERNAL_SERVER_ERROR
          break;

        case AlphapointServiceError.CouldNotChangeVerificationLevel:
          Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.CouldNotChangeAlphapointVerificationLevel);
          clientStatus = ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL;
          http = HttpStatus.INTERNAL_SERVER_ERROR
          break;

        case UserServiceError.CouldNotVerify:
          Datadog.report(LogType.VerifyMessage, UserServiceError.CouldNotVerify);
          clientStatus = ClientStatus.DATABASE_CONNECTION_FAILED;
          http = HttpStatus.INTERNAL_SERVER_ERROR
          break;

        case UserServiceError.NotFound:
          Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.InvalidUserEmail);
          clientStatus = ClientStatus.USER_NOT_FOUND
          http = HttpStatus.BAD_REQUEST
          break

        default:
          Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.InternalServerError);
          break;
      }

      const responseObject = Response.create({
        http,
        client: clientStatus,
      });

      res
        .status(http)
        .json(responseObject);
    }
  });

module.exports = VerifyRouter;
