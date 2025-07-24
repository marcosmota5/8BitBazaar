const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' } // Pending, Shipped, Completed, etc.
});

module.exports = mongoose.model('Order', OrderSchema);