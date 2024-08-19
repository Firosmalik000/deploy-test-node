const User = require('../models/userModel');
const argon = require('argon2');

const getUsers = async (req, res) => {
  try {
    const response = await User.find();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
    if (!response) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUsers = async (req, res) => {
  const { username, email, password, role, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ message: 'Password do not match' });

  const hashPassword = await argon.hash(password);
  try {
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created', newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { username, email, password, role, confPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    if (password !== confPassword) {
      res.status(400).json({ message: 'Password do not match' });
    }
    let hashPassword;
    if (password) {
      hashPassword = await argon.hash(password);
    } else {
      hashPassword = user.password;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = hashPassword;
    user.role = role || user.role;

    await user, save();

    res.status(200).json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  createUsers,
  updateUser,
  deleteUsers,
};
