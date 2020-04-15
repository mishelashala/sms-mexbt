const Express = require('express');
const HttpStatus = require('http-status');

const { validateMessageBody } = require('../middlewares/validation')
const AlphapointService = require('../services/AlphaPointSerice')
const UserService = require('../services/UserService')
const ClientStatus = require('../utils/client/status');
const Datadog = require('../utils/datadog');
const Response = require('../utils/response');

const Router = Express.Router();

export const LogType = {
  VerifyMessage: 'verify_message',
}

export const LogVerifyMessageType = {
  AlphapointAuth: 'alphapoint_auth',
  BadContentNegotiation: 'bad_content_negotiation',
  DatabaseConnectionError: 'error_database_connection',
  InternalServerError: 'internal_server_error',
  InvalidUserEmail: 'invalid_user_email',
  InvalidUserCode: 'invalid_user_code',
  MethodNotAllowed: 'method_not_allowed',
  UserAlreadyVerified: 'user_already_verified',
  UserVerified: 'user_verified'
}

Router
  .post('/', validateMessageBody, (req, res) => {
    /*!
     * Content negotiation (REST)
     */

    res.format({
      ['application/json']: async () => {
        try {
          /*!
           * Store the data from request body
           */

          const data = req.body;

          /*!
           * Search one user in the database using the email as query
           */

          const _user = await UserService.findOneByEmailAndCode({ email: data.email, code: data.code })

          /*!
           * Change user verified status and the updated at property
           * then save the changes in the database.
           */

          _user.verified = true;
          _user.updated_at = Date.now();

          await _user.save()

          /*!
           * Auth Attempt To Alphapoint
           */

          const { data } = await AlphapointService.auth()

          /*!
           * Attempt to change user verification level
           */

          await AlphapointService.verifyUser({ token: data.sessionToken, email: _user.email })

          /*!
           * If could not change verification level return error
           */

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
            data: _user
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
            case AlphapointServiceError.Auth:
              Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.AlphapointAuth);
              clientStatus = ClientStatus.ALPHAPOINT_CANNOT_AUTH;
              http = HttpStatus.INTERNAL_SERVER_ERROR
              break;

            case AlphapointServiceError.ChangeVerificationLevel:
              Datadog.report(LogType.VerifyMessage, AlphapointServiceError.ChangeVerificationLevel);
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

            case UserServiceError.AlreadyVerified:
              Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.UserAlreadyVerified);
              clientStatus = ClientStatus.USER_ALREADY_VERIFIED
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
      },

      /*!
       * If the Accept header is different from application/json
       * this code is executed
       */

      default () {
        Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.BadContentNegotiation);

        const responseObject = Response.create({
          http: HttpStatus.NOT_ACCEPTABLE
        });

        res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json(responseObject);
      }
    });
  })

  /*!
   * The rest of the HTTP Verbs are not allowed
   */

  .get('/', (req, res) => {
    Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.MethodNotAllowed);

    const responseObject = Response.create({
      http: HttpStatus.METHOD_NOT_ALLOWED
    });

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(responseObject);
  })

  .put('/', (req, res) => {
    Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.MethodNotAllowed);

    const responseObject = Response.create({
      http: HttpStatus.METHOD_NOT_ALLOWED
    });

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(responseObject);
  })

  .delete('/', (req, res) => {
    Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.MethodNotAllowed);

    const responseObject = Response.create({
      http: HttpStatus.METHOD_NOT_ALLOWED
    });

    res
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .json(responseObject);
  });

module.exports = Router;
