const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const ensureAuth = require('../middleware/auth');

// Checkout page
router.get('/checkout', ensureAuth, (req, res) => {
  res.render('orders/checkout'); // Form for checkout
});

// Handle order creation
router.post('/checkout', ensureAuth, async (req, res) => {
  try {
    const { items, totalAmount } = req.body; 
    // items should be array: [{ productId, quantity, price }]

    const order = await Order.create({ user: req.user._id, totalAmount });
    const details = items.map(item => ({
      order: order._id,
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    }));
    await OrderDetail.insertMany(details);

    res.redirect(`/orders/${order._id}`);
  } catch (err) {
    res.send('Error creating order: ' + err.message);
  }
});

// View single order
router.get('/:id', ensureAuth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user');
  const details = await OrderDetail.find({ order: order._id }).populate('product');
  res.render('orders/detail', { order, details });
});

module.exports = router;