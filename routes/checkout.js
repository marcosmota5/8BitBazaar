// Import the required modules
const express = require('express');
const ensureAuth = require('../middleware/auth');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const User = require('../models/User');
const router = express.Router();
const Product = require('../models/Product');

// Generate a unique order code
function generateOrderCode() {
  return 'ORD-' + Date.now(); // simple example, can make it fancier
}

// Create the provinces
const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan"
];

// Get method to render checkout page
router.get('/checkout', ensureAuth, async (req, res) => {
  // Get the suer by id
  const user = await User.findById(req.user._id).lean();

  // Render the checkout page
  res.render('checkout', {
    user,
    provinces,
    product_ids: req.query.product_ids || "",
    quantities: req.query.quantities || "",
    total: req.query.total || "0"
  });
});

// Post method to handle checkout form submission
router.post('/checkout', ensureAuth, async (req, res) => {
  try {
    // Get the form data
    const {
      recipientName, phoneNumber, addressLine_1, addressLine_2,
      postalCode, country, stateProvince, city, product_ids, quantities, total
    } = req.body;

    // Parse product IDs and quantities
    const productIdArray = product_ids.split(';').map(_id => _id.trim());
    const quantityArray = quantities.split(';').map(q => parseInt(q));

    // Fetch product details from DB
    const products = await Product.find({ _id: { $in: productIdArray } });

    // Map products by ID for quick lookup
    const productMap = {};
    products.forEach(p => {
      productMap[p._id.toString()] = p;
    });

    // Validate stock
    let insufficientStock = false;
    for (let i = 0; i < productIdArray.length; i++) {
      const _id = productIdArray[i];
      const quantity = quantityArray[i];
      const product = productMap[_id];

      if (!product || product.quantityInStock < quantity) {
        insufficientStock = true;
        break;
      }
    }

    // If any product doesn't have enough stock, redirect back to cart, this is necessary because another user might have purchased the product in the meantime
    if (insufficientStock) {
      req.flash('error', "One or more items don't have enough quantity in stock. Please review your cart.");
      return res.redirect('/cart');
    }

    // Create order
    const order = await Order.create({
      code: generateOrderCode(),
      user: req.user._id,
      recipientName,
      phoneNumber,
      addressLine_1,
      addressLine_2,
      postalCode,
      city,
      stateProvince,
      country,
      totalAmount: parseFloat(total)
    });

    // Build order details with real price, discount, and total price
    const orderDetails = productIdArray.map((_id, index) => {
      const product = productMap[_id];
      const price = product.price;
      const discount = product.discount || 0;
      const discountedPrice = price - (price * discount);
      const quantity = quantityArray[index];
      const totalPrice = (discountedPrice * quantity).toFixed(2);

      return {
        order: order._id,
        product: _id,
        quantity,
        price,
        discount,
        totalPrice
      };
    });

    // Insert order details
    await OrderDetail.insertMany(orderDetails);

    // Decrease product stock
    for (let i = 0; i < productIdArray.length; i++) {
      const _id = productIdArray[i];
      const quantity = quantityArray[i];
      await Product.findByIdAndUpdate(_id, {
        $inc: { quantityInStock: -quantity }
      });
    }

    // Redirect to the receipt page passing the command to clear the cart
    res.redirect(`/receipt/${order._id}?clearCart=true`);
  } catch (err) {
    // Print any error
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

// Export the module
module.exports = router;
