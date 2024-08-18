const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  qty: { type: Number, require: true },
  price: { type: Number, require: true },
  total: { type: Number, require: true },
  note: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
