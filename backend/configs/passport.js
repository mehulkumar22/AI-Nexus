import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userModel from '../models/userModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/user/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findOne({ email: profile.emails[0].value });

      if (!user) {
        user = await userModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "google_auth", // placeholder
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
