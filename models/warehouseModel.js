const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: String,
  arrivalDate: Date,
  condition: String,
  location: String,
  code: String,
  note: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
module.exports = Warehouse;
