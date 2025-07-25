const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/users/'),
  filename: (req, file, cb) => cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

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

router.get('/login', (req, res) => {
  res.render('auth/login', { error: req.flash('error') });
});

// POST login with flash error messages
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid email or password'
  }),
  (req, res) => {
    res.redirect('/products'); // redirect after successful login
  }
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

// Save full profile changes
router.post('/profile', upload.single('profile-picture'), async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  try {
    const updateData = {
      first_name: req.body['first-name'],
      last_name: req.body['last-name'],
      birth_date: req.body['birth-date'],
      sex: req.body.sex,
      phone_number: req.body['phone-number'],
      email: req.body.email,
      address_line_1: req.body['address-line-1'],
      address_line_2: req.body['address-line-2'],
      postal_code: req.body['postal-code'],
      country: req.body.country,
      state_province: req.body.province,
      city: req.body.city
    };
    if (req.file) updateData.picturePath = `/images/users/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user._id, updateData);
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating profile.');
    res.redirect('/profile');
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