const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ensureAuth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/products'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Products page
router.get('/', async (req, res) => {
  try {
    // Get the flag from query (returns string)
    const showAllProductsQuery = req.query.showAllProducts === 'true';
    const isAdmin = req.user && req.user.profile === 'Admin';

    // Determine whether to show all products
    const showAllProducts = isAdmin && showAllProductsQuery;

    // Build filter
    let filter = {};
    if (!showAllProducts) {
      filter = {
        status: 'A',
        quantityInStock: { $gt: 0 }
      };
    }

    const products = await Product.find(filter).lean();

    res.render('products/index', { 
      products, 
      toastrMessage: req.flash('success'), 
      showAllProducts // Pass to the view for the checkbox
    });
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  }
});

// Create (Form)
router.get('/add', ensureAuth, (req, res) => res.render('products/add'));
router.post('/add', ensureAuth, upload.single('picturePath'), async (req, res) => {
  try {
    const {
      code,
      name,
      type,
      status,
      price,
      discount,
      quantityInStock,
      description
    } = req.body;

    // Handle checkboxes (Multer sends "on" or undefined)
    const isDeal = req.body.isDeal === 'on';
    const isFeaturedDeal = req.body.isFeaturedDeal === 'on';

    // Handle image upload
    const picturePath = req.file ? '/images/products/' + req.file.filename : '/images/no-picture.png';

    await Product.create({
      code,
      name,
      type,
      status,
      price: parseFloat(price),
      discount: parseFloat(discount) || 0,
      quantityInStock: parseInt(quantityInStock),
      isDeal,
      isFeaturedDeal,
      description,
      picturePath
    });

    req.flash('success', 'Product added successfully!');
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error adding product: ' + err.message);
    res.redirect('/products/add');
  }
});

// Update Product
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  res.render('products/edit', { product });
});
router.post('/edit/:id', ensureAuth, upload.single('picturePath'), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      price: parseFloat(req.body.price),
      discount: parseFloat(req.body.discount) || 0,
      quantityInStock: parseInt(req.body.quantityInStock),
      isDeal: req.body.isDeal === 'on',
      isFeaturedDeal: req.body.isFeaturedDeal === 'on',
    };

    if (req.file) {
      updateData.picturePath = '/images/products/' + req.file.filename;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    req.flash('success', 'Product updated successfully!');
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating product: ' + err.message);
    res.redirect(`/products/${req.params.id}/edit`);
  }
});

// Delete Product
router.post('/delete', ensureAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Error deleting product: ' + err.message);
  }
});

module.exports = router;
