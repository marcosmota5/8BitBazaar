const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ensureAuth = require('../middleware/auth');

// Read (Public)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('products/index', { products });
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
