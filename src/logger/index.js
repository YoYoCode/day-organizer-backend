const winston = require('winston');
const fs = require('fs');
const config = require('../config');

const logDir = `${__dirname}/logs`;
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
  fs.mkdirSync(`${logDir}/history`);
}

const tsFormat = () => new Date().toLocaleTimeString();
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: 'complete',
      filename: `${logDir}/complete.log`,
      timestamp: tsFormat,
      json: false,
      colorize: false,
      prettyPrint: true
    }),
    new winston.transports.File({
      name: 'errors',
      filename: `${logDir}/errors.log`,
      timestamp: tsFormat,
      colorize: true,
      json: true,
      level: 'error',
      prettyPrint: true
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logDir}/history/-results.log`,
      timestamp: tsFormat,
      datePattern: 'YYYY-MM-DD.',
      colorize: true,
      prepend: true,
      json: true,
      level: 'info',
      prettyPrint: true
    }),
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      prettyPrint: true,
      silent: config.environment === 'testing'
    })
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
