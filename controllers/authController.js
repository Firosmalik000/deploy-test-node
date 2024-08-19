const User = require('../models/userModel');
const argon = require('argon2');

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await argon.verify(user.password, req.body.password);

    if (!match) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    req.session.userId = user._id;
    const { _id, username, email, role } = user;

    return res.status(200).json({ user: { _id, username, email, role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: 'Failed to Log Out' });

    return res.status(200).json({ message: 'User Log Out' });
  });
};

const me = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthenticated' });

  try {
    const user = await User.findById(req.session.userId, '_id username email role');
    if (!user) return res.status(404).json({ message: 'user not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  logout,
  me,
};
