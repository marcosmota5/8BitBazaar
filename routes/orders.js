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
  const order = await Order.findById(req.params._id).populate('user');
  const details = await OrderDetail.find({ order: order._id }).populate('product');
  res.render('orders/detail', { order, details });
});

// GET /orders - show logged-in user's orders
router.get('/', ensureAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ order_date: -1 }).lean();

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

    res.render('orders/index', { orders, orderItemsByOrder });
  } catch (err) {
    res.status(500).send('Error loading orders: ' + err.message);
  }
});

module.exports = router;