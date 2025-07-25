const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
