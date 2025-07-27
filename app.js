// Get the required modules and config
require('dotenv').config();
require('./config/database');
require('./config/passport');

// Get the session and passport modules
const session = require('express-session');
const passport = require('passport');

// Get other required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

// Register the Handlebars partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Import the route modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');
var ordersRouter = require('./routes/orders');
var aboutRouter = require('./routes/about');
var cartRouter = require('./routes/cart');
var changePasswordRouter = require('./routes/changePassword');
var checkoutRouter = require('./routes/checkout');
var contactRouter = require('./routes/contact');
var dealsRouter = require('./routes/deals');
var receiptRouter = require('./routes/receipt');
var subscribeRoutes = require('./routes/subscribe');

// Create an Express application
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register a Handlebars helper to compare values
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

// Register a Handlebars helper to calculate the discount
hbs.registerHelper('calcDiscount', (price, discount) => {
  return (price * (1 - discount)).toFixed(2);
});

// Register a Handlebars helper to concat values
hbs.registerHelper('concat', function (...args) {
  // Remove the last argument (Handlebars options object)
  args.pop();
  return args.join(' ');
});

// Register a Handlebars helper to truncate values and show tooltip
hbs.registerHelper('truncateWithTooltip', function (text, length) {
  if (!text) return '';
  const str = text.toString();
  if (str.length > length) {
    return new hbs.SafeString(
      `<span title="${str}">${str.substring(0, length)}[...]</span>`
    );
  }
  return new hbs.SafeString(`<span title="${str}">${str}</span>`);
});

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set up flash messages for user feedback
const flash = require('connect-flash');
app.use(flash());

// Middleware to set local variables for views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.successMessage = req.flash('success')[0] || null;
  res.locals.errorMessages = req.flash('error')[0] || null;
  next();
});

// Set up CORS for API routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/about', aboutRouter);
app.use('/receipt', receiptRouter);
app.use('/', cartRouter);
app.use('/', changePasswordRouter);
app.use('/', checkoutRouter);
app.use('/', contactRouter);
app.use('/', dealsRouter);
app.use('/', subscribeRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export the app module
module.exports = app;
