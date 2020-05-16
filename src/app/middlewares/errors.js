/**
 * Error handling
 */
const logger = require('../../logger/index');
module.exports.errorHandler = app => {
  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || ~err.message.indexOf('Cast to ObjectId failed'))) {
      return next();
    }

    logger.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    return res.status(404).json(payload);
  });
};
