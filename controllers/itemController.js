const Item = require('../models/itemModel');
const Status = require('../models/statusModel');
const User = require('../models/userModel');
const Warehouse = require('../models/warehouseModel');

const index = async (req, res) => {
  try {
    const items = await Item.find().populate('user_id', ['username', 'email']).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const store = async (req, res) => {
  try {
    const { name, orderType, category, qty, price, total, supplier, note } = req.body;
    const userId = req.session.userId;

    if (!name || !orderType || !category || !qty || !price || !total || !supplier) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new Item({
      name,
      orderType,
      category,
      qty,
      price,
      total,
      supplier,
      note,
      user_id: userId,
    });

    await newItem.save();

    const status = new Status({
      item_id: newItem._id,
    });
    await status.save();

    res.status(201).json({ message: 'Item added', newItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { name, orderType, category, qty, price, total, supplier, note } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.name = name;
    item.orderType = orderType;
    item.category = category;
    item.qty = qty;
    item.price = price;
    item.total = total;
    item.supplier = supplier;
    item.note = note;

    await item.save(); // Simpan perubahan

    res.status(200).json({ message: 'Item updated', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  index,
  store,
  getItemById,
  destroy,
  update,

};
