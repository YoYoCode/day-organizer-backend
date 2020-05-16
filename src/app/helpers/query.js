const _ = require('lodash');
module.exports = {
  /**
   * * Get Multiple record based on condition (if passed)
   */
  get: (Model, conditions = {}, options = {}, projections = null) =>
    Model.find({ ...conditions, deleteFlag: false }, projections, options)
      .select('-deleteFlag -__v')
      .lean(),

  /**
   * * Get One Object based on condition (if passed)
   */
  getOne: (Model, conditions = {}, options = {}, projections = null) =>
    Model.findOne({ ...conditions, deleteFlag: false }, projections, options)
      .select('-deleteFlag -__v')
      .lean(),

  /**
   * * Create a record
   */
  post: async (Model, data) => {
    const createdData = await Model.create(data);
    return _.omit(createdData.toObject(), ['deleteFlag', '__v']);
  },

  /**
   * * Create an array of records
   */
  postArray: (Model, data) => Model.insertMany(data),

  /**
   * * Update a record
   */
  update: (Model, conditions, data, options = {}) =>
    Model.findOneAndUpdate({ deleteFlag: false, ...conditions }, data, options).select('-deleteFlag -__v'),

  /**
   * * Soft Delete -> Update the deletedFlag to `true`
   */
  delete: (Model, conditions, options = {}) =>
    Model.findOneAndUpdate({ deleteFlag: false, ...conditions }, { deleteFlag: true }, options).select('-deleteFlag -__v'),

  deleteMany: (Model, data, options = {}) => Model.updateMany({ _id: { $in: data } }, { deleteFlag: true }, options)
};
