const express = require('express');
const User = require('../models/User');
const router = express.Router();

const ensureAuth = require('../middleware/auth');

const masterAdminId = '688196acae724fde1eaa178d';

// Only Admins can access
router.get('/', ensureAuth, async (req, res) => {
  if (req.user.profile !== 'Admin') return res.redirect('/');

  // Exclude the current user AND the main admin
  const users = await User.find({ 
    _id: { $nin: [req.user._id, masterAdminId] } 
  }).lean();

  res.render('users', { users });
});

router.post('/update/:id', ensureAuth, async (req, res) => {
  if (req.user.profile !== 'Admin') return res.redirect('/');

  try {
    const { profile, status } = req.body;

    // Prevent updating the main admin
    if (req.params.id === masterAdminId) {
      req.flash('error', 'Operation not allowed.');
      return res.redirect('/users');
    }

    await User.findByIdAndUpdate(req.params.id, { profile, status });
    req.flash('success', 'User updated successfully');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating user: ' + err.message);
  }
  res.redirect('/users');
});

module.exports = router;