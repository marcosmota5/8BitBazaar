const express = require('express');
const ensureAuth = require('../middleware/auth');
const router = express.Router();
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

// GET /receipt/:id - render order receipt
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const orderId = req.params.id;
    const clearCart = req.query.clearCart === 'true'; // read query

    // Fetch the order and ensure it belongs to the logged-in user
    const order = await Order.findOne({ _id: orderId, user: req.user._id }).lean();
    if (!order) {
      return res.status(404).send('No order found.');
    }

    // Format the order date for display (MM/DD/YYYY HH:mm)
    const orderDate = new Date(order.orderDate);
    order.formattedDate = orderDate.toLocaleString(undefined, { 
      year: 'numeric',
      month: 'numeric',  // Let locale decide single vs double digits
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });

    // Fetch order items and join with product info
    const orderItems = await OrderDetail.find({ order: order._id })
      .populate('product')
      .lean();
    
    res.render('receipt', { order, orderItems, clearCart });
  } catch (err) {
    res.status(500).send('Error loading receipt: ' + err.message);
  }
});

module.exports = router;
