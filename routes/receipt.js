const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

// Middleware to require login
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// POST /receipt - render order receipt
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { order_id } = req.body;

    // Fetch the order and ensure it belongs to the logged-in user
    const order = await Order.findOne({ _id: order_id, user: req.user._id }).lean();
    if (!order) {
      return res.status(404).send('No order found.');
    }

    // Fetch order items and join with product info
    const orderItems = await OrderDetail.find({ order: order._id })
      .populate('product')
      .lean();

    res.render('orders/receipt', { order, orderItems });
  } catch (err) {
    res.status(500).send('Error loading receipt: ' + err.message);
  }
});

module.exports = router;
