// Import the required modules
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get method to render the deals page
router.get('/deals', async (req, res) => {
  try {
    // Get the products that are active, in stock, and marked as deals
    const products = await Product.find({
      status: 'A',
      quantityInStock: { $gt: 0 },
      isDeal: 1
    }).lean();

    // Render the deals page with the products
    res.render('deals', { products: products });
  } catch (err) {
    // Log the error and send a 500 status response
    console.error(err);
    res.status(500).send('Error loading deals');
  }
});

// Export the module
module.exports = router;
