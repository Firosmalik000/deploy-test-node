const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
