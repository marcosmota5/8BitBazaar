const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/deals', async (req, res) => {
  try {
    const products = await Product.find({
      status: 'A',
      quantity_in_stock: { $gt: 0 },
      is_deal: true
    }).lean();

    const formattedProducts = products.map(p => ({
      ...p,
      discountedPrice: (p.price * (1 - p.discount)).toFixed(2),
      roundedPrice: p.price.toFixed(2)
    }));

    res.render('deals', { products: formattedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading deals');
  }
});

module.exports = router;
