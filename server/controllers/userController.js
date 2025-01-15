const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { generateToken } = require('../utils/generateToken');
const { hashPassword } = require('../utils/hashPassword');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users' });
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const dupeEmails = await User.findOne({ email });
    if (!dupeEmails) {
      const hashedPassword = await hashPassword(password);
      const newUser = {
        username,
        password: hashedPassword,
        email,
      };
      await User.create(newUser);
      res.status(201).json({ username, email });
    } else {
      res.status(400).json({ message: 'User with this email already exists!' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create user', error: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:userId
// @access  Public
const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

// @desc    Get currently logged in user
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

// @desc  Gets user by email and password (for logging in)
// @route POST /api/users/login
// @access Public
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error', error: error.message });
  }
};

// @desc  Google login
// @route POST /api/users/google-login
// @access Public
const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    // Fetch user info from Google using the access token
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    console.log(response.data);
    const { id, email, name, picture } = response.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId: id,
        email,
        username: name,
        picture,
      });
    }

    const jwtToken = generateToken(user);
    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.log('Error during google login: ', error);
    res
      .status(500)
      .json({ message: 'Google login failed', error: error.message });
  }
};

// @desc  Find user by id and replace it with new user data
// @route PATCH /api/users/:userId
// @access Private
const replaceUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const updateUser = await User.findOneAndReplace(
      { _id: userId },
      { ...req.body },
      { new: true }
    );
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user'});
  }
};

// @desc  Find user by id and update it with new user data
// @route PUT /api/users/:userId
// @access Private
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.picture = req.file.location;
    }
    
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );
    console.log(updateData);
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// @desc  Find user by id and delete it
// @route DELETE /api/users/:userId
// @access Private
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

const addUserStation = async (req, res) => {
  const { userId } = req.params;
  const { stationId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      if (user.stations.includes(stationId)) {
        return res.status(400).json({ message: 'Station already added to user' });
      }
      user.stations.push(stationId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to add station to user' });
  }
};

const removeUserStation = async (req, res) => {
  const { userId, stationId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      user.stations = user.stations.filter((station) => station != stationId);
      await user.save();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove station from user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getMe,
  userLogin,
  googleLogin,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
  addUserStation,
  removeUserStation,
};
