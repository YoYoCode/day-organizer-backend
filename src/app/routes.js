/* eslint-disable new-cap */
/**
 * module dependencies
 */
const listEndpoints = require('express-list-endpoints');

const { authenticate } = require('./middlewares/authenticate');

/**
 * import controllers
 */
const { healthCheck } = require('./controllers/healthCheck');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/users');
const taskRouter = require('./controllers/tasks');
const labelRouter = require('./controllers/labels');
const pusherRouter = require('./controllers/pusher');

/**
 * Adding version
 */
const versioning = app => {
  const router = require('express').Router();
  router.use('/users', userRouter);
  router.use('/', pusherRouter);
  router.use(authenticate);
  router.use('/tasks', taskRouter);
  router.use('/labels', labelRouter);
  return router;
};

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/ping', (_, res) => res.send('pong'));
  app.get('/', (req, res) => {
    res.json(listEndpoints(app));
  });
  app.use('/auth', loginRouter);
  app.use('/api/v1', versioning(app));
};
