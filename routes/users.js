// Import the required modules
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const ensureAuth = require('../middleware/auth');

// Declare the master admin ID, which is the only user that cannot be modified
const masterAdminId = '688196acae724fde1eaa178d';

// Get method ensuring only Admins can access
router.get('/', ensureAuth, async (req, res) => {
  // If the user is not an admin, redirect to the home page
  if (req.user.profile !== 'Admin') return res.redirect('/');

  // Exclude the current user AND the main admin
  const users = await User.find({ 
    _id: { $nin: [req.user._id, masterAdminId] } 
  }).lean();

  // Render the users page
  res.render('users', { users });
});

// Post method to update the user
router.post('/update/:id', ensureAuth, async (req, res) => {
  // If the user is not an admin, redirect to the home page
  if (req.user.profile !== 'Admin') return res.redirect('/');

  try {
    // Get the profile and status from the request body
    const { profile, status } = req.body;

    // Prevent updating the master admin
    if (req.params.id === masterAdminId) {
      req.flash('error', 'Operation not allowed.');
      return res.redirect('/users');
    }

    // Update the user with the new profile and status and flash a message
    await User.findByIdAndUpdate(req.params.id, { profile, status });
    req.flash('success', 'User updated successfully');
  } catch (err) {
    // If there was an error, log it, flash an error message, and redirect to users
    console.error(err);
    req.flash('error', 'Error updating user: ' + err.message);
  }
  res.redirect('/users');
});

// Export the module
module.exports = router;