// Import the required modules
const express = require('express');
const ensureAuth = require('../middleware/auth');
const router = express.Router();
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

// Get method torender order receipt
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    // Get the order ID from the request parameters and clearCart query
    const orderId = req.params.id;
    const clearCart = req.query.clearCart === 'true'; // read query

    // Get the order and ensure it belongs to the logged-in user
    const order = await Order.findOne({ _id: orderId, user: req.user._id }).lean();
    
    // If no order is found, return a 404 error
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

    // Get the order items and join with product info
    const orderItems = await OrderDetail.find({ order: order._id })
      .populate('product')
      .lean();
    
      // Render the receipt page with order and items
    res.render('receipt', { order, orderItems, clearCart });
  } catch (err) {
    // Log the error and send a 500 status response
    res.status(500).send('Error loading receipt: ' + err.message);
  }
});

// Export the module
module.exports = router;
