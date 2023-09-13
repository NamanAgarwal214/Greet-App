const crypto = require("crypto");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ email: profile.email });
        if (!user) {
          const password = crypto
            .createHash("sha256")
            .update(profile.id + profile.given_name)
            .digest("hex");
          const newUser = new User({
            name: profile.displayName,
            email: profile.email,
            password,
            googleId: profile.id,
          });
          //   console.log(newUser, "user");
          await User.create(newUser);
          return done(null, newUser);
        } else {
          if (user.googleId === undefined) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  User.findById(user._id, function (err, user) {
    done(err, user);
  });
});
