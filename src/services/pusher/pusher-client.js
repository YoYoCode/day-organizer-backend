const webPush = require('web-push');

const initPusher = async config => {
  const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY, MAIL_TO } = config.VAPID_KEYS;

  webPush.setVapidDetails(MAIL_TO, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

  console.log('Configured WebPush');

  return webPush;
};

module.exports = initPusher;
