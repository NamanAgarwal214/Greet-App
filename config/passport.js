// const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./../models/userModel');

module.exports = async (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/greetings',
        passReqToCallback: true
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ googleId: profile.id });
            if(!user){
              const newUser = new User({
                name: profile.displayName,
                email: profile.email,
                photo: profile.picture,
                googleId: profile.id,
              });
              console.log(newUser);
              await User.create(newUser);
              return done(null, newUser);
            } else {
              return done(null, user);
            }
        } catch (err) {
          console.log(err);
        }
        
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
