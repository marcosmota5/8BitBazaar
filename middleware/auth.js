// Middleware function to ensure user authentication
function ensureAuth(req, res, next) {
  // If the user is authenticated, proceed to the next middleware
  if (req.isAuthenticated()) {
    return next();
  }

  // If the user is not authenticated, store the original URL in flash messages and redirect to the login page
  req.flash('returnTo', req.originalUrl);
  res.redirect('/login');
}

// Export the middleware function
module.exports = ensureAuth;
