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

// Register page
router.get('/register', (req, res) => {
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
      addressLine_1: req.body.addressLine_1,
      addressLine_2: req.body.addressLine_2,
      postalCode: req.body.postalCode,
      city: req.body.city,
      stateProvince: req.body.stateProvince,
      country: req.body.country,
      picturePath: req.file ? `/images/users/${req.file.filename}` : null
    };
    console.log("REGISTER BODY:", req.body);
    console.log("REGISTER FILE:", req.file);
    await User.create(userData);
    res.redirect('/login');
  } catch (err) {
    //console.error(err);
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
    res.redirect('/'); // redirect after successful login
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