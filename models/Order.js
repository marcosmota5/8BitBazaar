// Create the mongoose object
const mongoose = require('mongoose');

// Create the order schema matching the database structure
const OrderSchema = new mongoose.Schema({
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

// Export the model
module.exports = mongoose.model('Order', OrderSchema);
