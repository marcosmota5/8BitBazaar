// Import the required modules
const express = require('express');
const router = express.Router();

// Get method for the subscribe page
router.get('/subscribe', (req, res) => {
    const emailAddress = req.query.emailAddress || '';
    res.render('subscribe', { emailAddress });
});

// Export the module
module.exports = router;
