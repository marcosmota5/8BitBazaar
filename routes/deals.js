const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/deals', async (req, res) => {
  try {
    const products = await Product.find({
      status: 'A',
      quantityInStock: { $gt: 0 },
      isDeal: 1
    }).lean();

    res.render('deals', { products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading deals');
  }
});

module.exports = router;
