const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/cart', async (req, res) => {
  const products = await Product.find({ status: 'A', quantity_in_stock: { $gt: 0 } });
  const formattedProducts = products.map(p => ({
    ...p._doc,
    discountedPrice: (p.price * (1 - p.discount)).toFixed(2),
    quantityOptions: Array.from({ length: p.quantity_in_stock }, (_, i) => i + 1)
  }));

  res.render('cart', {
    products: formattedProducts
  });
});

module.exports = router;
