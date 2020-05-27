const pusher = webPush => {
  const sendNotification = (subscription, payload) => {
    webPush.sendNotification(subscription, payload).catch(error => console.error(error));
  };

  return {
    sendNotification
  };
};

module.exports = pusher;
