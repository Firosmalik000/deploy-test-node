const Warehouse = require('../models/warehouseModel');
const User = require('../models/userModel');
const Report = require('../models/report');

const index = async (req, res) => {
  try {
    const warehouse = await Warehouse.find()
      .populate({
        path: 'status_id',
        populate: {
          path: 'item_id',
        },
      })
      .populate('user_id', ['username', 'email'])
      .sort({ createdAt: -1 });
    res.status(200).json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWarehouse = async (req, res) => {
  const { name, arrivalDate, condition, location, code, note } = req.body;

  if (!name || !arrivalDate || !condition || !location || !code) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('Looking for warehouse with id:', req.params.id);
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    console.log('Looking for user with session userId:', req.session.userId);
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    warehouse.name = name;
    warehouse.arrivalDate = arrivalDate;
    warehouse.condition = condition;
    warehouse.location = location;
    warehouse.code = code;
    warehouse.note = note || warehouse.note;
    warehouse.user_id = user._id;

    console.log('Saving warehouse...');
    await warehouse.save();

    console.log('Creating report for warehouse...');
    const report = new Report({
      warehouse_id: warehouse._id,
    });
    await report.save();

    res.status(200).json({ message: 'Warehouse updated successfully' });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  index,
  updateWarehouse,
};
