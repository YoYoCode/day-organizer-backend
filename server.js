'use strict';

require('dotenv').config();

const apiServer = require('./app.js');
const logger = require('./src/logger/index.js');
const config = require('./src/config/index.js');
const database = require('./src/db/index.js');
const loadServices = require('./src/services/index.js');

const port = process.env.PORT || 3000;

function listen(app) {
  if (app.get('env') === 'test') return;
  app.listen(port);
  logger.info('ToDo app started on port ' + port);
}

async function start() {
  await database(config).connect();
  const services = await loadServices(config);
  const app = apiServer(services);
  listen(app);
}

start();
