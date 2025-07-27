// Import the required modules
var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

// Get method for the main page
router.get('/', async (req, res) => {
  try {
    // Get the products that are active, in stock, and featured deals
    const products = await Product.find({
      status: 'A',
      quantityInStock: { $gt: 0 },
      isFeaturedDeal: 1
    }).lean();

    // Render the main page with the products
    res.render('index', { products });
  } catch (err) {
    // Log the error and send a 500 status response
    console.error(err);
    res.status(500).send('Error loading main page');
  }
});

// Export the module
module.exports = router;
