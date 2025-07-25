const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  shippingInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addr1: { type: String, required: true },
    addr2: { type: String },
    postal: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' } // Pending, Shipped, Completed, etc.
});

module.exports = mongoose.model('Order', OrderSchema);
