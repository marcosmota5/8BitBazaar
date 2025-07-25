const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ensureAuth = require('../middleware/auth');

// Products page
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({
      status: 'A',
      quantityInStock: { $gt: 0 }
    }).lean();

    res.render('products/index', { products, toastrMessage: req.flash('success') });
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  }
});

// Create (Form)
router.get('/add', ensureAuth, (req, res) => res.render('products/add'));
router.post('/add', ensureAuth, async (req, res) => {
  await Product.create(req.body);
  res.redirect('/products');
});

// Update
router.get('/:id/edit', ensureAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/edit', { product });
});
router.post('/:id/edit', ensureAuth, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
});

// Delete
router.get('/:id/delete', ensureAuth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = router;
