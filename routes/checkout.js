const express = require('express');
const ensureAuth = require('../middleware/auth');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const User = require('../models/User');
const router = express.Router();

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
      name, 'phone-number': phone, 'address-line-1': addr1, 'address-line-2': addr2,
      'postal-code': postal, country, province, city, product_ids, quantities, total
    } = req.body;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      totalAmount: parseFloat(total),
      shippingInfo: { name, phone, addr1, addr2, postal, country, province, city },
      status: 'Pending'
    });

    // Create order details
    const productIdArray = product_ids.split(',').map(id => id.trim());
    const quantityArray = quantities.split(',').map(q => parseInt(q));

    const orderDetails = productIdArray.map((id, index) => ({
      order: order._id,
      product: id,
      quantity: quantityArray[index],
      price: 0 // You can query Product to fetch actual price if needed
    }));

    await OrderDetail.insertMany(orderDetails);

    res.redirect(`/orders/${order._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
