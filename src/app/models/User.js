/* eslint-disable no-throw-literal */

const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      unique: true
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [String],
    userPhoto: {
      type: String,
      trim: true
    },
    deleteFlag: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
  { usePushEach: true }
);

UserSchema.methods = {
  // Generating jwt after creating a user and after login
  async generateAuthToken() {
    const token = jwt.sign({ _id: this._id.toHexString(), username: this.username }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    await this.updateOne({
      $push: {
        tokens: token
      }
    });
    return token;
  },
  removeUnwantedFields() {
    return _.omit(this.toObject(), ['password', 'tokens', '__v', 'deleteFlag']);
  }
};

UserSchema.statics = {
  async findByToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.findOne({
      _id: decoded._id
    }).populate('tenant');
    return user;
  },
  async findByCredentials(username, password) {
    const user = await this.findOne({ username });
    if (!user) {
      throw 'User not found';
    }
    // Use bcrypt.compare to compare password and user.password
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw 'Incorrect Password';
  }
};

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
