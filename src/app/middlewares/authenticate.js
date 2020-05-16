/* eslint-disable no-throw-literal */
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('x-auth') || req.header('authorization') || req.body.token || req.query.token;
    if (!token) {
      throw 'Token not provided';
    }
    const user = await User.findByToken(token);
    if (!user) {
      throw 'Authentication Error';
    }
    req.user = user.removeUnwantedFields();
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

module.exports = { authenticate };
