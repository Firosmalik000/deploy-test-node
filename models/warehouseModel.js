const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: String,
  arrivalDate: Date,
  condition: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: String,
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

const warehouse = mongoose.model('Warehouse', warehouseSchema);
module.exports = warehouse;
