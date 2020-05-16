/* eslint-disable new-cap */
/* eslint-disable no-throw-literal */
/**
 * Module dependencies.
 */
const userRouter = require('express').Router();
const User = require('../models/User.js');

/**
 * Load User Details
 */
const getUserDetails = async (req, res) => {
  res.send(req.user);
};

/**
 * Create user
 */
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw 'Invalid User Data';
    }
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ data: { user: user.removeUnwantedFields() }, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

userRouter.get('/', getUserDetails);
userRouter.post('/', createUser);

module.exports = userRouter;
