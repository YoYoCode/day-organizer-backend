const { promisify } = require('util');

const actions = client => {
  const redisSet = async (key, value, expiry = null) => {
    const setEx = promisify(client.setex).bind(client);
    console.debug(`setting redis for key ${key} with values ${value}`);
    await setEx(key, expiry, value);
  };

  const redisGet = async key => {
    const get = promisify(client.get).bind(client);
    console.debug(`getting redis value for key ${key}`);
    const value = await get(key);
    console.debug(`redis value for key ${key} is ${value}`);
    return value;
  };

  const redisDel = async key => {
    const del = promisify(client.del).bind(client);
    console.debug(`Deleting key ${key} from redis`);
    await del(key);
  };

  const redisScan = match => {
    return new Promise((resolve, reject) => {
      let totalKeys = [];
      let cursor = '0';
      function scan() {
        client.scan(cursor, 'MATCH', match, 'COUNT', '100', (err, res) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          cursor = res[0];
          const keys = res[1];

          if (keys.length > 0) {
            totalKeys = [...totalKeys, ...keys];
          }
          return cursor === '0' ? resolve(totalKeys) : scan();
        });
      }
      scan();
    });
  };

  return {
    redisGet,
    redisSet,
    redisDel,
    redisScan
  };
};

module.exports = actions;
