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

// GET - Render checkout page
router.get('/checkout', ensureAuth, async (req, res) => {
  const user = await User.findById(req.user._id).lean();

  res.render('checkout', {
    user,
    provinces,
    product_ids: req.query.product_ids || "",
    quantities: req.query.quantities || "",
    total: req.query.total || "0"
  });
});

// POST - Handle checkout form submission
router.post('/checkout', ensureAuth, async (req, res) => {
  try {
    const {
      recipientName, phoneNumber, addressLine_1, addressLine_2,
      postalCode, country, stateProvince, city, product_ids, quantities, total
    } = req.body;

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

    // Parse product IDs and quantities
    const productIdArray = product_ids.split(';').map(_id => _id.trim());
    const quantityArray = quantities.split(';').map(q => parseInt(q));

    // Fetch product details from DB
    const products = await Product.find({ _id: { $in: productIdArray } }).lean();

    // Map products by ID for quick lookup
    const productMap = {};
    products.forEach(p => {
      productMap[p._id.toString()] = p;
    });

    // Build order details with real price, discount, and total price
    const orderDetails = productIdArray.map((_id, index) => {
      const product = productMap[_id];
      if (!product) throw new Error(`Product with ID ${_id} not found`);
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

    res.redirect(`/receipt/${order._id}?clearCart=true`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
