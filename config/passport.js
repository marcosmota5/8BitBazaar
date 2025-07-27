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
        email: profile.emails?.[0]?.value || `noemail-${profile.id}@github.com`,
        firstName: profile.displayName || profile.username || "GitHubUser",
        lastName: "(GitHub)",
        sex: 'N',
        password: Math.random().toString(36).slice(-8), // random placeholder
        registerDate: new Date(),
        birthDate: new Date('1990-01-01'), // placeholder
        addressLine_1: "Not Provided",
        postalCode: "00000",
        city: "Not Provided",
        stateProvince: "Ontario",
        country: "Canada",
        status: 'A',
        profile: 'User'
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


// Serialize & Deserialize user
passport.serializeUser((user, done) => {
  done(null, user._id); // store numeric id
});
passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id); // find by numeric id
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;