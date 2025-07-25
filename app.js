require('dotenv').config();
require('./config/database');
require('./config/passport');

const session = require('express-session');
const passport = require('passport');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash('error'); // makes error messages available to templates
  next();
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/about', aboutRouter);
app.use('/', cartRouter);
app.use('/', changePasswordRouter);
app.use('/', checkoutRouter);
app.use('/', contactRouter);
app.use('/', dealsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
