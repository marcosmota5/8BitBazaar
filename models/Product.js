const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  picture_path: String,
  quantity_in_stock: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  is_featured_deal: { type: Boolean, default: false },
  is_deal: { type: Boolean, default: false },
  status: { type: String, enum: ['A', 'I'], default: 'A' }
});

module.exports = mongoose.model('Product', ProductSchema);
