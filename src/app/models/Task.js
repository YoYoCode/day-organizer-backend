const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    userId: {
      type: ObjectId
    },
    status: {
      type: String,
      default: 'ACTIVE'
    },
    label: {
      type: ObjectId,
      ref: 'Label'
    },
    priority: {
      type: String
    },
    reminder: {
      type: Date
    },
    deleteFlag: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

taskSchema.pre('find', function() {
  this.populate({ path: 'label', select: 'name _id' });
});

taskSchema.pre('findOne', function() {
  this.populate({ path: 'label', select: 'name _id' });
});

taskSchema.pre('findOneAndUpdate', function() {
  this.populate({ path: 'label', select: 'name _id' });
});

module.exports = mongoose.model('Task', taskSchema);
