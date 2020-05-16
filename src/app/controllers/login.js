/* eslint-disable new-cap */

/**
 * Module dependencies.
 */
const _ = require('lodash');
const User = require('../models/User');
const loginRouter = require('express').Router();

/**
 * User Login
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDetails = await User.findByCredentials(username, password);
    const token = await userDetails.generateAuthToken();
    res.send({ data: { user: pick(userDetails), token } });
  } catch (err) {
    res.status(400).send(JSON.stringify(err, ['stack'], 4));
  }
};

const pick = userDetails => _.pick(userDetails, ['username', '_id']);
loginRouter.post('/login', login);

module.exports = loginRouter;
