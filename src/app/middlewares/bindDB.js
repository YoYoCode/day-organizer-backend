module.exports = async (req, res, next) => {
  const { database } = req.user.tenant;
  req.conn = global.connections[database];
  next();
};
