const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  picturePath: String,
  quantityInStock: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  isFeaturedDeal: { type: Number, default: false },
  isDeal: { type: Number, default: false },
  status: { type: String, enum: ['A', 'I'], default: 'A' }
}, { collection: 'Products' });

module.exports = mongoose.model('Product', ProductSchema);
