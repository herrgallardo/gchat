const mongoose = require('mongoose');

const userModel = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default: '../frontend/src/icons/avatar.png',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userModel);

module.exports = User;
