// Import the required modules
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get method for the cart page
router.get('/cart', async (req, res) => {

  // Get the active products with quantity in stock greater than 0
  const products = await Product.find({ status: 'A', quantityInStock: { $gt: 0 } });
  
  // Format the products to include quantity options
  const formattedProducts = products.map(p => ({
    ...p._doc,
    quantityOptions: Array.from({ length: p.quantityInStock }, (_, i) => i + 1)
  }));
  
  // Render the cart with the formatted products
  res.render('cart', {
    products: formattedProducts
  });
});

// Export the module
module.exports = router;
