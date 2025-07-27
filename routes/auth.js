const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/users/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan'
  ];

// Register page
router.get('/register', (req, res) => {
  res.render('auth/register', { provinces });
});
router.post('/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sex: req.body.sex,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      phoneNumber: req.body.phoneNumber,
      addressLine_1: req.body.addressLine_1,
      addressLine_2: req.body.addressLine_2,
      postalCode: req.body.postalCode,
      city: req.body.city,
      stateProvince: req.body.stateProvince,
      country: req.body.country,
      profile: 'User',
      picturePath: req.file ? `/images/users/${req.file.filename}` : null
    };
    await User.create(userData);
    req.flash('success', 'User successfully registered. Please login.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);

    // If there was a file uploaded, keep its path in the user object
    if (req.file) {
      req.body.picturePath = `/images/users/${req.file.filename}`;
    }

    // Re-render the register page with error messages
    res.render('auth/register', { 
      errorMessages: 'Error registering: ' + err.message, 
      successMessage: null,
      user: req.body,
      provinces: provinces
    });
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST login with flash error messages
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash('success', 'Login successful!');
      res.redirect('/');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logout successful!');
    res.redirect('/');
  });
});

// GitHub Login
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    req.flash('success', 'Logged with GitHub successful!');
    res.redirect('/'); // redirect after successful login
  }
);

// Profile page
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
    const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan'
  ];

  // Format birthDate as YYYY-MM-DD for input type="date"
  const user = req.user.toObject();
  if (user.birthDate) {
    user.birthDate = user.birthDate.toISOString().split('T')[0];
  }

  res.render('auth/profile', { user, provinces });
});

// Save full profile changes
router.post('/profile', upload.single('profilePicture'), async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  try {
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sex: req.body.sex,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      phoneNumber: req.body.phoneNumber,
      addressLine_1: req.body.addressLine_1,
      addressLine_2: req.body.addressLine_2,
      postalCode: req.body.postalCode,
      city: req.body.city,
      stateProvince: req.body.stateProvince,
      country: req.body.country,
    };

    // Preserve existing picture if no new one is uploaded
    updateData.picturePath = req.file
      ? `/images/users/${req.file.filename}`
      : req.body.existingPicturePath; 

    await User.findByIdAndUpdate(req.user._id, updateData);
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating profile: ' + err.message);
    res.redirect('/profile');
  }
});

module.exports = router;