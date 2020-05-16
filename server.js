'use strict';

require('dotenv').config();

const app = require('./app.js');
const logger = require('./src/logger/index.js');
const config = require('./src/config/index.js');
const database = require('./src/db/index.js');

const port = process.env.PORT || 3000;

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  logger.info('ToDo app started on port ' + port);
}

async function start() {
  await database(config).connect();
  listen();
}

start();
