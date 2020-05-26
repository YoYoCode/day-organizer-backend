/**
 * Expose
 */

module.exports = {
  DB_URL: process.env.MONGO_DB_URL,
  DEFAULT_DB: process.env.DEFAULT_DB,
  VAPID_KEYS: {
    PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY,
    MAIL_TO: 'mailto:codingknights@gmail.com'
  },
  api: {
    bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
    parameterLimit: process.env.API_PARAMETER_LIMIT,
    port: process.env.PORT
  }
};
