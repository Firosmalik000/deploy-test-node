const Report = require('../models/report');

const index = async (req, res) => {
  try {
    const report = await Report.find()
      .populate('warehouse_id')
      .populate({
        path: 'warehouse_id',
        populate: {
          path: 'status_id',
          populate: {
            path: 'item_id',
          },
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  index,
};
