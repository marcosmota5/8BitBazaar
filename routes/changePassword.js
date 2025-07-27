// Import the required modules
const express = require('express');
const bcrypt = require('bcrypt');
const ensureAuth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get method for the change password page
router.get('/change-password', ensureAuth, (req, res) => {
  res.render('change-password', { successMessage: null, errorMessages: null });
});

// Post method to change the password ensuring the user is authenticated
router.post('/change-password', ensureAuth, async (req, res) => {
  // Get the current password, new password, and confirm password from the request body
  const { 'current-password': currentPassword, 'new-password': newPassword, 'confirm-password': confirmPassword } = req.body;
  
  // Initialize an array to hold error messages
  const errors = [];

  try {
    // Get the user by id from the database
    const user = await User.findById(req.user._id);
    
    // If the user is not found, redirect to login
    if (!user) return res.redirect('/login');

    // Compare the passwords and validate the current password, new password, and confirm password, returning errors if any
    const match = await user.comparePassword(currentPassword);
    if (!match) errors.push("Current password is incorrect.");
    if (newPassword !== confirmPassword) errors.push("New password and confirmation do not match.");
    if (errors.length > 0) return res.render('change-password', { errorMessages: errors.join('<br>'), successMessage: null });

    // Get the salt for hashing the new password
    const salt = await bcrypt.genSalt(10);

    // Hash the new password manually by passing the salt
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Directly update only the password of the user
    await User.updateOne({ _id: req.user._id }, { $set: { password: hashedPassword } });

    // Render the change password page with a success message
    return res.render('change-password', { successMessage: "Password successfully changed!", errorMessages: null });
  } catch (err) {
    // Print the error to the console for debugging
    console.error(err);
    return res.render('change-password', { errorMessages: "Unexpected error. Details: " + err.message, successMessage: null });
  }
});

// Export the module
module.exports = router;
