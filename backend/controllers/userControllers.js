const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, avatar } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please complete all the required fields');
  }

  const mailExists = await User.findOne({ email });
  const userExists = await User.findOne({ username });

  const checkPassword = (pwd) => {
    let re = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return re.test(pwd);
  };

  if (!checkPassword(password)) {
    res.status(400);
    throw new Error(
      'The password must contain at least 8 characters, one upper case and one special character'
    );
  }

  if (mailExists) {
    res.status(400);
    throw new Error('Email already used');
  }

  if (userExists) {
    res.status(400);
    throw new Error('Username already used');
  }

  const user = await User.create({
    username,
    email,
    password,
    avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('The new user could not be created');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
