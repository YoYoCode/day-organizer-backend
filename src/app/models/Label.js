const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const labelSchema = new mongoose.Schema(
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
    colorCode: {
      type: String
    },
    deleteFlag: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Label', labelSchema);
