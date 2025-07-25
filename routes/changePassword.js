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
    if (!user) {
      return res.redirect('/login');
    }

    // Check current password
    const match = await user.comparePassword(currentPassword);
    if (!match) {
      errors.push("Current password is incorrect.");
    }

    // Check new password matches confirm
    if (newPassword !== confirmPassword) {
      errors.push("New password and confirmation do not match.");
    }

    // If errors, show them
    if (errors.length > 0) {
      return res.render('change-password', { errorMessages: errors.join('<br>'), successMessage: null });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.render('change-password', { successMessage: "Password successfully changed!", errorMessages: null });

  } catch (err) {
    console.error(err);
    return res.render('change-password', { errorMessages: "Unexpected error. Try again later.", successMessage: null });
  }
});

module.exports = router;
