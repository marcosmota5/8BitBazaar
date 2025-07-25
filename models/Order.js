const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  code: { type: String, required: true },
  order_date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient_name: { type: String, required: true },
  phone_number: String,
  address_line_1: { type: String, required: true },
  address_line_2: String,
  postal_code: { type: String, required: true },
  city: { type: String, required: true },
  state_province: { type: String, required: true },
  country: { type: String, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
