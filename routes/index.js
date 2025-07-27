var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});*/


router.get('/', async (req, res) => {
  try {
    const products = await Product.find({
      status: 'A',
      quantityInStock: { $gt: 0 },
      isFeaturedDeal: 1
    }).lean();

    res.render('index', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading main page');
  }
});


module.exports = router;
