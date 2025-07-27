// Import the required modules
var express = require('express');
var router = express.Router();

// Get the method for the about page
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About' });
});

// Export the module
module.exports = router;
