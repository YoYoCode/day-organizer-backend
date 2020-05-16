const mongoose = require('mongoose');

module.exports = config => {
  const connect = async () => {
    mongoose.connection
      .on('open', () => {
        console.log(`Connected To Database -> ${config.DEFAULT_DB}`);
      })
      .on('error', () => {
        console.log(`Error While Connecting to -> ${config.DEFAULT_DB}`);
      })
      .on('disconnected', () => {
        console.log(`Disconnected From Database -> ${config.DEFAULT_DB}`);
      });

    await mongoose.connect(config.DB_URL, {
      dbName: config.DEFAULT_DB,
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true
    });
  };

  return { connect };
};
