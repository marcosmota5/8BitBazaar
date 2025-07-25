const express = require('express');
const router = express.Router();

router.get('/subscribe', (req, res) => {
    const emailAddress = req.query.emailAddress || '';
    res.render('subscribe', { emailAddress });
});

module.exports = router;
