const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/cart', async (req, res) => {
  const products = await Product.find({ status: 'A', quantityInStock: { $gt: 0 } });
  const formattedProducts = products.map(p => ({
    ...p._doc,
    quantityOptions: Array.from({ length: p.quantityInStock }, (_, i) => i + 1)
  }));

  res.render('cart', {
    products: formattedProducts
  });
});

module.exports = router;
