const { env } = process;
let config;

const EnvName = {
  Production: "production",
  Staging: "staging",
};

switch (env.NODE_ENV) {
  case EnvName.Production:
    config = {
      account_sid: env.TWILIO_ACCOUNT_SID,
      auth_token: env.TWILIO_AUTH_TOKEN,
      twilio_phone_number: env.TWILIO_PHONE_NUMBER,

      alphapoint_login_url: env.ALPHAPOINT_LOGIN_URL, // 'https://sim.mexbt.com:8451/ajax/v1/Login'
      alphapoint_change_verification_level_url:
        env.ALPHAPOINT_CHANGE_VERIFICATION_URL,
      alphapoint_admin_username: env.ALPHAPOINT_ADMIN_USERNAME,
      alphapoint_admin_password: env.ALPHAPOINT_ADMIN_PASSWORD,

      db_host: env.PROD_DB_HOST,
      db_port: env.PROD_DB_PORT,
      db_name: env.PROD_DB_NAME,
      db_user: env.PROD_DB_USER,
      db_pass: env.PROD_DB_PASS,
    };
    break;

  case EnvName.Staging:
    config = {
      account_sid: env.TWILIO_ACCOUNT_SID,
      auth_token: env.TWILIO_AUTH_TOKEN,
      twilio_phone_number: env.TWILIO_PHONE_NUMBER,

      alphapoint_login_url: env.ALPHAPOINT_LOGIN_URL,
      alphapoint_change_verification_level_url:
        env.ALPHAPOINT_CHANGE_VERIFICATION_URL,
      alphapoint_admin_username: env.ALPHAPOINT_ADMIN_USERNAME,
      alphapoint_admin_password: env.ALPHAPOINT_ADMIN_PASSWORD,

      db_host: env.STAG_DB_HOST,
      db_port: env.STAG_DB_PORT,
      db_name: env.STAG_DB_NAME,
      db_user: env.STAG_DB_USER,
      db_pass: env.STAG_DB_PASS,
    };
    break;

  // development
  default:
    config = {
      account_sid: env.TWILIO_ACCOUNT_SID,
      auth_token: env.TWILIO_AUTH_TOKEN,
      twilio_phone_number: env.TWILIO_PHONE_NUMBER,

      alphapoint_login_url: env.ALPHAPOINT_LOGIN_URL,
      alphapoint_change_verification_level_url:
        env.ALPHAPOINT_CHANGE_VERIFICATION_URL,
      alphapoint_admin_username: env.ALPHAPOINT_ADMIN_USERNAME,
      alphapoint_admin_password: env.ALPHAPOINT_ADMIN_PASSWORD,

      phone_number: env.DEV_PHONE_NUMBER,
      phone_region: env.DEV_PHONE_REGION,

      user_email: env.DEV_USER_EMAIL,

      verification_code: env.DEV_VERIFICATION_CODE,

      db_host: env.DEV_DB_HOST,
      db_port: env.DEV_DB_PORT,
      db_name: env.DEV_DB_NAME,
      db_user: env.DEV_DB_USER,
      db_pass: env.DEV_DB_PASS,
    };
    break;
}

module.exports = config;
