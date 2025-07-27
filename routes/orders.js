// Import the required modules
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const ensureAuth = require('../middleware/auth');

// Get method for the checkout page
router.get('/checkout', ensureAuth, (req, res) => {
  res.render('orders/checkout');
});

// Post method to handle order creation
router.post('/checkout', ensureAuth, async (req, res) => {
  try {
    // Get the items and total amount from the request body
    const { items, totalAmount } = req.body;

    // Create the order
    const order = await Order.create({ user: req.user._id, totalAmount });
    
    // Get the details
    const details = items.map(item => ({
      order: order._id,
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    // Insert order details
    await OrderDetail.insertMany(details);

    // Redirect to the order page with the new order ID
    res.redirect(`/orders/${order._id}`);
  } catch (err) {

    // Log the error and send a 500 status response
    res.send('Error creating order: ' + err.message);
  }
});

// Get method to show the logged-in user's orders
router.get('/', ensureAuth, async (req, res) => {
  try {

    // Get the orders for the logged user
    const orders = await Order.find({ user: req.user._id }).sort({ orderDate: -1 }).lean();

    // Format order dates
    orders.forEach(order => {
      const date = new Date(order.orderDate);
      order.formattedDate = date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    });

    // Get the order ids and details
    const orderIds = orders.map(order => order._id);
    const orderDetails = await OrderDetail.find({ order: { $in: orderIds } })
      .populate('product')
      .lean();

    // Group items by order
    const orderItemsByOrder = {};
    for (const item of orderDetails) {
      const orderId = item.order.toString();
      if (!orderItemsByOrder[orderId]) orderItemsByOrder[orderId] = [];
      item.discountFormatted = (item.discount * 100).toFixed(2); // Format discount as percentage
      orderItemsByOrder[orderId].push(item);
    }

    // Render the orders page wit hthe orders and items
    res.render('orders/index', { orders, orderItemsByOrder });
  } catch (err) {
    // Log the error and send a 500 status response
    res.status(500).send('Error loading orders: ' + err.message);
  }
});

// Export the module
module.exports = router;