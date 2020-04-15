const Axios = require('axios');

export const AlphapointServiceError = {
  CouldNotAuth: 'Alphapoint Error: Could Not Auth',
  CouldNotChangeVerificationLevel: 'Alphapoint Error: Coudl Not Change Verification Level'
}

/*!
 * Authenticate user and returns session token
 */
async function auth() {
  const { data } = await Axios.post('https://sim.mexbt.com:8451/ajax/v1/Login', {
    adminUserId: 'william',
    password: 'william123'
  });

  if (!data.isAccepted) {
    throw new Error(AlphapointServiceError.CouldNotAuth)
  }

  return data
}

/*!
 * Verifies user in Alphapoint's database
 */
async function verifyUser({ token, email }) {
  const { data } = await Axios.post('https://sim.mexbt.com:8451/ajax/v1/SetUserVerificationLevel', {
    sessionToken: token,
    UserId: email,
    VerificationLevel: '3'
  });

  if (!data.isAccepted) {
    throw new Error(AlphapointServiceError.CouldNotChangeVerificationLevel);
  }

  return data
}

module.exports = {
  auth,
  verifyUser
}