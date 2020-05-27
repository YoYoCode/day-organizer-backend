/* eslint-disable new-cap */

/**
 * Module dependencies.
 */

const router = require('express').Router();

/**
 * Web Push Notifications
 */
// const subscription =

const pusherRouter = services => {
  const { notifier } = services;
  router.post('/subscribe', async (req, res) => {
    try {
      const subscription = req.body.subscription;
      console.log(subscription);
      res.status(201).json({});

      const payload = JSON.stringify({
        title: 'Welcome to TODOLIST',
        name: `Hello!! ${req.body.user.data.user.username}`
      });
      console.log(payload);
      notifier.sendNotification(subscription, payload);
    } catch (error) {
      console.log(error);
      res.status(400).send(JSON.stringify(error, ['stack'], 4));
    }
  });
  return router;
};

module.exports = pusherRouter;
