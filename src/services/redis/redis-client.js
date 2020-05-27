const redis = require('redis');

const handleExpiredEvents = (_channel, message) => {
  console.log(message);
};

const createClient = config => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const client = redis.createClient({ host: config.REDIS.REDIS_HOST, port: config.REDIS.REDIS_PORT });
      client.auth(config.REDIS.REDIS_PASSWORD);
      client.on('connect', () => {
        resolve(client);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const initRedis = async config => {
  const subscriber = await createClient(config);
  /**
   * * Configure the redis client to emit events on expiry
   */

  subscriber.config('set', 'notify-keyspace-events', 'Ex');

  /**
   * * Subscribe to expired events
   */
  subscriber.subscribe('__keyevent@0__:expired');

  subscriber.on('message', handleExpiredEvents);

  console.log('Redis Subscriber Configured..');

  const client = await createClient(config);

  return {
    client,
    subscriber
  };
};

module.exports = initRedis;
