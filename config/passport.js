const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: 'Incorrect email.' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        username: profile.username,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`,
        first_name: profile.displayName || profile.username,
        last_name: '',
        sex: 'N',
        password: Math.random().toString(36).slice(-8), // random placeholder
        register_date: new Date(),
        birth_date: new Date('1970-01-01'), // placeholder
        address_line_1: '',
        postal_code: '',
        city: '',
        state_province: '',
        country: '',
        status: 'A'
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


// Serialize & Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // store numeric id
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ id }); // find by numeric id
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;