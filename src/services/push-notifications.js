const webPush = require('web-push');

const configure = async config => {
  const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY, MAIL_TO } = config.VAPID_KEYS;

  webPush.setVapidDetails(MAIL_TO, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

  console.log('Configured WebPush');
};

const pusher = () => {
  const sendNotification = (subscription, payload) => {
    webPush.sendNotification(subscription, payload).catch(error => console.error(error));
  };

  return {
    sendNotification
  };
};

module.exports = {
  configure,
  pusher
};
