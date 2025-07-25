const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientName: { type: String, required: true },
  phoneNumber: String,
  addressLine_1: { type: String, required: true },
  addressLine_2: String,
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  country: { type: String, required: true }
}, { collection: 'Orders' });

module.exports = mongoose.model('Order', OrderSchema);
