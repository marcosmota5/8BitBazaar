// get the required modules, including passport, strategies, and the User model
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Create the local Strategy, which is used for local authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If no user found, return an error
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    // Check if user is inactive and if so, return an error
    if (user.status === 'I') {
      return done(null, false, { message: 'Your account is inactive. Please contact support.' });
    }
  
    // Compare the provided password with the stored password
    const isMatch = await user.comparePassword(password);

    // If password does not match, return an error
    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
    
    // If everything is fine, return the user
    return done(null, user);
  } catch (err) {
    // If there was an error during the process, return it
    return done(err);
  }
}));

// Create the GitHub Strategy, which is used for GitHub authentication
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Try finding the user by GitHub ID
    let user = await User.findOne({ githubId: profile.id });

    // If the user was not found by GitHub ID, try by email
    if (!user && profile.emails?.length) {
      user = await User.findOne({ email: profile.emails[0].value });
    }

    // If the user is still not found, create a new one
    if (!user) {
      user = await User.create({
        githubId: profile.id,
        email: profile.emails?.[0]?.value || `noemail-${profile.id}@github.com`,
        firstName: profile.displayName || profile.username || "GitHubUser",
        lastName: "(GitHub)",
        sex: 'N',
        password: Math.random().toString(36).slice(-8),
        registerDate: new Date(),
        birthDate: new Date('1990-01-01'),
        addressLine_1: "Not Provided",
        postalCode: "00000",
        city: "Not Provided",
        stateProvince: "Ontario",
        country: "Canada",
        status: 'A',
        profile: 'User'
      });
    } 

    // If found by email but no GitHub ID, link the account
    else if (!user.githubId) {
      user.githubId = profile.id;
      await user.save();
    }

    // Check if account is inactive and if so, return an error
    if (user.status === 'I') {
      return done(null, false, { message: 'Account is inactive. Please contact support.' });
    }

    // If everything is fine, return the user
    return done(null, user);
  } catch (err) {

    // If there was an error during the process, return it
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

// Export the passport module
module.exports = passport;