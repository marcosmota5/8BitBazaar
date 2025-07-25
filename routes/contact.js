const express = require('express');
const router = express.Router();

// Simple thank-you page
router.get('/contact-received', (req, res) => {
  res.render('contact-received');
});

module.exports = router;
