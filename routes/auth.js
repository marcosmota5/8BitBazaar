const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register page
router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', async (req, res) => {
  try {
    await User.create({ username: req.body.username, password: req.body.password });
    res.redirect('/login');
  } catch (err) {
    res.send('Error registering: ' + err.message);
  }
});

// Login page
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/products')
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// GitHub Login
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/products')
);

// Profile page
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.render('auth/profile', { user: req.user });
});

// Save profile changes
router.post('/profile', async (req, res) => {
  try {
    const { username } = req.body;
    await User.findByIdAndUpdate(req.user._id, { username });
    res.redirect('/profile');
  } catch (err) {
    res.send('Error updating profile: ' + err.message);
  }
});

// Change password
router.post('/profile/password', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user._id);
    user.password = password; // will trigger hash in pre-save
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    res.send('Error changing password: ' + err.message);
  }
});


module.exports = router;