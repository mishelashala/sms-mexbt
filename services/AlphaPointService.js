const Axios = require('axios');

/*!
 * Authenticate user and returns session token
 */
function auth() {
  return Axios.post('https://sim.mexbt.com:8451/ajax/v1/Login', {
    adminUserId: 'william',
    password: 'william123'
  });
}

/*!
 * Verifies user in Alphapoint's database
 */
function verifyUser({ token, email }) {
  return Axios.post('https://sim.mexbt.com:8451/ajax/v1/SetUserVerificationLevel', {
    sessionToken: token,
    UserId: email,
    VerificationLevel: '3'
  });
}

module.exports = {
  auth,
  verifyUser
}