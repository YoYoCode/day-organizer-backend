const webPusherClient = require('./pusher/pusher-client.js');
// const redisClient = require('./redis/redis-client');

const webPusherActions = require('./pusher/pusher-actions.js');
// const redisActions = require('./redis/redis-actions.js');

const initServices = async config => {
  try {
    /**
     * * Connection Established
     */
    const pusher = await webPusherClient(config);
    // const { client } = await redisClient(config);

    /**
     * * Loading Actions
     */

    const notifier = webPusherActions(pusher);
    // const redis = redisActions(client);

    return { notifier };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = initServices;
