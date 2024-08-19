const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
