const Axios = require("axios");
const keys = require("../keys");

export const AlphapointServiceError = {
  CouldNotAuth: "Alphapoint Error: Could Not Auth",
  CouldNotChangeVerificationLevel:
    "Alphapoint Error: Coudl Not Change Verification Level",
};

/*!
 * Authenticate user and returns session token
 */
async function auth() {
  const { data } = await Axios.post(keys.alphapoint_login_url, {
    adminUserId: keys.alphapoint_admin_username,
    password: keys.alphapoint_admin_password,
  });

  if (!data.isAccepted) {
    throw new Error(AlphapointServiceError.CouldNotAuth);
  }

  return data;
}

/*!
 * Verifies user in Alphapoint's database
 */
async function verifyUser({ token, email }) {
  const { data } = await Axios.post(keys.alphapoint_change_verification_url, {
    sessionToken: token,
    UserId: email,
    VerificationLevel: "3",
  });

  if (!data.isAccepted) {
    throw new Error(AlphapointServiceError.CouldNotChangeVerificationLevel);
  }

  return data;
}

module.exports = {
  auth,
  verifyUser,
};
