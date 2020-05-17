/**
 * Expose
 */

module.exports = {
  DB_URL: process.env.MONGO_DB_URL,
  DEFAULT_DB: process.env.DEFAULT_DB,
  api: {
    bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
    parameterLimit: process.env.API_PARAMETER_LIMIT,
    port: process.env.PORT
  }
};
