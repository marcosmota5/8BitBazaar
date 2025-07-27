// Import the required modules
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ensureAuth = require('../middleware/auth');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/users/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Define the provinces for the registration form
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

// Get and post methods for the register page
router.get('/register', (req, res) => {
  res.render('auth/register', { provinces });
});
router.post('/register', upload.single('profilePicture'), async (req, res) => {
  try {
    // Initialize the user data from the form body
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

    // Create the user
    await User.create(userData);

    // If the creation was successful, flash a success message and redirect to login
    req.flash('success', 'User successfully registered. Please login.');
    res.redirect('/login');
  } catch (err) {

    // Print the error to the console for debugging
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

// Get and post methods for the login page
router.get('/login', (req, res) => {
  res.render('auth/login', { returnTo: req.session.returnTo || null });
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // If there was an error, return it
    if (err) return next(err);

    // If the user was not found, it indicates a failed login, so flash an error message and redirect to login again
    if (!user) {
      req.flash('error', info?.message || 'Login failed');
      return res.redirect('/login');
    }

    // Get the redirect url with fallback to the home page
    const redirectUrl = req.flash('returnTo')[0] || '/';
    
    // Method to perform the login
    req.logIn(user, (err) => {
      // If there was an error, return it
      if (err) return next(err);

      // Flash a success message and redirect to the intended page
      req.flash('success', 'Login successful!');      
      res.redirect(redirectUrl);
    });
  })(req, res, next);
});

// Get methods for login with GitHub
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/login', failureFlash: true }, (err, user, info) => {
    // If there was an error, return it
    if (err) return next(err);

    // If the user was not found, redirect to login
    if (!user) return res.redirect('/login');

    // Get the redirect url with fallback to the home page
    const redirectUrl = req.flash('returnTo')[0] || '/';

    // Method to perform the login
    req.logIn(user, (err) => {
      // If there was an error, return it
      if (err) return next(err);

      // Flash a success message and redirect to the intended page
      req.flash('success', 'Logged with GitHub successfully!');
      res.redirect(redirectUrl);
    });
  })(req, res, next);
});

// Get method for logging out
router.get('/logout', ensureAuth, (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logout successful!');
    res.redirect('/');
  });
});

// Get method for the profile page
router.get('/profile', ensureAuth, (req, res) => {
  // Format birthDate as YYYY-MM-DD for input type="date"
  const user = req.user.toObject();
  if (user.birthDate) {
    user.birthDate = user.birthDate.toISOString().split('T')[0];
  }
  
  // Render the profile page with user data and provinces
  res.render('auth/profile', { user, provinces });
});

// Save full profile changes
router.post('/profile', ensureAuth, upload.single('profilePicture'), async (req, res) => {
  try {
    // Create the object with the data to be updated
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

      // Find the user by ID and update their profile
    await User.findByIdAndUpdate(req.user._id, updateData);

    // If the update was successful, flash a success message and redirect to profile
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/profile');
  } catch (err) {
    // If there was an error, log it, flash an error message, and redirect to profile
    console.error(err);
    req.flash('error', 'Error updating profile: ' + err.message);
    res.redirect('/profile');
  }
});

// Export the module
module.exports = router;