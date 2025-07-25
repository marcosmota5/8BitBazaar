const express = require('express');
const router = express.Router();

// Show contact form
router.get('/contact', (req, res) => {
  res.render('contact');
});

// Handle form submission
router.post('/contact', (req, res) => {
  // You can later add email sending or DB storage here
  console.log('Contact form submitted:', req.body);
  res.redirect('/contact-received');
});

router.get('/contact-received', (req, res) => {
  res.render('contact-received');
});

module.exports = router;
