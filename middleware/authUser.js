const User = require('../models/userModel');

const VerifyUser = async (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthenticated' });

  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.userId = user._id;
    req.role = user.role;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'admin') return res.status(401).json({ message: 'Access Denied' });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  VerifyUser,
  adminOnly,
};
