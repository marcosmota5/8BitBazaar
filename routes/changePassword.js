const express = require('express');
const bcrypt = require('bcrypt');
const ensureAuth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Show form
router.get('/change-password', ensureAuth, (req, res) => {
  res.render('change-password', { successMessage: null, errorMessages: null });
});

// Handle form submission
router.post('/change-password', ensureAuth, async (req, res) => {
  const { 'current-password': currentPassword, 'new-password': newPassword, 'confirm-password': confirmPassword } = req.body;
  const errors = [];

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.redirect('/login');

    const match = await user.comparePassword(currentPassword);
    if (!match) errors.push("Current password is incorrect.");
    if (newPassword !== confirmPassword) errors.push("New password and confirmation do not match.");
    if (errors.length > 0) return res.render('change-password', { errorMessages: errors.join('<br>'), successMessage: null });

    const salt = await bcrypt.genSalt(10);

    // Hash the new password manually
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Directly update only the password
    await User.updateOne({ _id: req.user._id }, { $set: { password: hashedPassword } });

    return res.render('change-password', { successMessage: "Password successfully changed!", errorMessages: null });
  } catch (err) {
    console.error(err);
    return res.render('change-password', { errorMessages: "Unexpected error. Details: " + err.message, successMessage: null });
  }
});

module.exports = router;
