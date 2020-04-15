const Express = require('express');
const HttpStatus = require('http-status');
const Axios = require('axios');
const Mongoose = require('mongoose');

const User = require('../databases/').models.user;
const Response = require('../utils/response');
const ClientStatus = require('../utils/client/status');
const Datadog = require('../utils/datadog');
const { validateMessageBody } = require('../middlewares/validation')

const Router = Express.Router();

Mongoose.Promise = Promise;

export const AlphapointError = {
  Auth: 'Alphapoint Auth',
  ChangeVerificationLevel: 'Alphapoint Change Verification Level'
}

export const LogType = {
  VerifyMessage: 'verify_message',
}

export const LogVerifyMessageType = {
  AlphapointAuth: 'alphapoint_auth',
  BadContentNegotiation: 'bad_content_negotiation',
  DatabaseConnectionError: 'error_database_connection',
  InvalidUserEmail: 'invalid_user_email',
  InvalidUserCode: 'invalid_user_code',
  MethodNotAllowed: 'method_not_allowed',
  UserAlreadyVerified: 'user_already_verified',
  UserVerified: 'user_verified'
}

const UserVerificationServiceError = {
  CouldNotVerify: 'error_database_verifying_user'
}

Router
  .post('/', validateMessageBody, (req, res) => {
    /*!
     * Content negotiation (REST)
     */

    res.format({
      'application/json' () {
        /*!
         * Store the data from request body
         */

        const data = req.body;

        /*!
         * Search one user in the database using the email as query
         */

        User
          .findOne({ email: data.email })
          .exec()
          .then((_user) => {
            if (!_user) {
              Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.InvalidUserEmail);

              const responseObject = Response.create({
                http: HttpStatus.BAD_REQUEST,
                client: ClientStatus.USER_NOT_FOUND
              });

              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(responseObject);
            }

            if (_user.code !== data.code) {
              Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.InvalidUserCode);

              const responseObject = Response.create({
                http: HttpStatus.BAD_REQUEST,
                client: ClientStatus.INVALID_VERIFICATION_CODE
              });

              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(responseObject);
            }

            if (_user.verified === true) {
              Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.UserAlreadyVerified);

              const responseObject = Response.create({
                http: HttpStatus.BAD_REQUEST,
                client: ClientStatus.USER_ALREADY_VERIFIED
              });

              return res
                .status(HttpStatus.BAD_REQUEST)
                .json(responseObject);
            }

            /*!
             * Change user verified status and the updated at property
             * then save the changes in the database.
             */

            _user.verified = true;
            _user.updated_at = Date.now();

            _user
              .save()
              .then(() => {
                /*
                 * Report to datadog
                 */

                Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.UserVerified);

                /*!
                 * Auth Attempt To Alphapoint
                 */

                return Axios.post('https://sim.mexbt.com:8451/ajax/v1/Login', {
                  'adminUserId': 'william',
                  'password': 'william123'
                });
              })
              .then((response) => {
                /*!
                 * If login was successfull return response
                 */

                if (response.data.isAccepted === true) {
                  return response.data;
                }

                /*!
                 * If login was not successfull return error
                 */

                return Promise.reject({ message: AlphapointError.Auth });
              })
              .then((data) => {
                /*!
                 * Attempt to Change user verification level
                 */

                return Axios.post('https://sim.mexbt.com:8451/ajax/v1/SetUserVerificationLevel', {
                  sessionToken: data.sessionToken,
                  UserId: _user.email,
                  VerificationLevel: '3'
                });
              })
              .then((response) => {
                /*!
                 * If verification level changed respond 202 Accepted
                 */

                if (response.data.isAccepted === true) {
                  const responseObject = Response.create({
                    http: HttpStatus.ACCEPTED,
                    client: ClientStatus.USER_VERIFIED,
                    data: _user
                  });

                  return res
                    .status(HttpStatus.ACCEPTED)
                    .json(responseObject);
                }

                /*!
                 * If could not change verification level return error
                 */

                return Promise.reject({ message: AlphapointError.ChangeVerificationLevel });
              })
              .catch((err) => {
                let clientStatus;

                /*!
                 * Handle client status and message
                 */

                switch (err.message) {
                  case AlphapointError.Auth:
                    Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.AlphapointAuth);
                    clientStatus = ClientStatus.ALPHAPOINT_CANNOT_AUTH;
                    break;

                  case AlphapointError.ChangeVerificationLevel:
                    Datadog.report(LogType.VerifyMessage, AlphapointError.ChangeVerificationLevel);
                    clientStatus = ClientStatus.CANNOT_CHANGE_VERIFICATION_LEVEL;
                    break;

                  default:
                    Datadog.report(LogType.VerifyMessage, UserVerificationServiceError.CouldNotVerify);
                    clientStatus = ClientStatus.DATABASE_CONNECTION_FAILED;
                    break;
                }

                const responseObject = Response.create({
                  http: HttpStatus.INTERNAL_SERVER_ERROR,
                  client: clientStatus
                });

                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json(responseObject);
              });
          })
          .catch(() => {
            Datadog.report(LogType.VerifyMessage, LogVerifyMessageType.DatabaseConnectionError);

            const responseObject = Response.create({
              http: HttpStatus.INTERNAL_SERVER_ERROR,
              client: ClientStatus.DATABASE_CONNECTION_FAILED
            });

            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json(responseObject);
          });
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
