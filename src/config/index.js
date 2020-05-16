const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

/**
 * Expose
 */

module.exports = {
  development: { ...development },
  test: { ...test },
  production: { ...production }
}[process.env.NODE_ENV || 'development'];
