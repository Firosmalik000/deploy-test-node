const Warehouse = require('../models/warehouseModel');

const index = async (req, res) => {
  try {
    const warehouse = await Warehouse.find().populate({
      path: 'status_id',
      populate: {
        path: 'item_id',
      },
    });
    res.status(200).json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  index,
};
