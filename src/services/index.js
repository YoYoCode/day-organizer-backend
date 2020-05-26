const webPusher = require('./push-notifications.js');
// const redisClient = require('./redis.js');

module.exports = async config => {
  try {
    await webPusher.configure(config);
    // await redisClient.configure(config);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
