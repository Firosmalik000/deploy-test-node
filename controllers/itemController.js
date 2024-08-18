const Item = require('../models/itemModel');

const index = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const store = async (req, res) => {
  try {
    const { name, qty, price, total, note } = req.body;

    if (!name || !qty || !price || !total) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newItem = new Item({
      name,
      qty,
      total,
      price,
      note,
    });
    await newItem.save();
    res.status(201).json({ message: 'Item added', newItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404).json('items not found');
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, qty, price, total, note } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.name = name;
    item.qty = qty;
    item.price = price;
    item.total = total;
    item.note = note;

    await item.save();

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
