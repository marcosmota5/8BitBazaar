// Import the required modules
const express = require('express');
const router = express.Router();

// Get method to show the contact form
router.get('/contact', (req, res) => {
  res.render('contact');
});

// Handle form submission
router.post('/contact', (req, res) => {
  // You can later add email sending or DB storage here
  console.log('Contact form submitted:', req.body);
  res.redirect('/contact-received');
});

// Get method to show the contact received page
router.get('/contact-received', (req, res) => {
  res.render('contact-received');
});

// Export the module
module.exports = router;
