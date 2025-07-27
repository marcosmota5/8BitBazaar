function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
    req.session.returnTo = req.originalUrl;
  req.flash('returnTo', req.originalUrl);
  res.redirect('/login');
}

module.exports = ensureAuth;
