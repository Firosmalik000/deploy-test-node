const Status = require('../models/statusModel');
const User = require('../models/userModel');
const Warehouse = require('../models/warehouseModel');

const index = async (req, res) => {
  try {
    const status = await Status.find()
      .populate('acceptedBy', ['username', 'email', 'role'])
      .populate({
        path: 'item_id',
        populate: {
          path: 'user_id',
          select: ['username', 'email'],
        },
      });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await Status.findById(req.params.id);
    const user = await User.findById(req.session.userId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('role', user.role);

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    item.status = status;
    item.acceptedBy = user._id;
    await item.save();

    if (item.status === 'approved') {
      const warehouse = new Warehouse({
        status_id: item._id,
      });
      await warehouse.save();
      console.log('Warehouse created:', warehouse);
    }

    res.status(200).json({ message: 'Status updated', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  index,
  updateStatus,
};
