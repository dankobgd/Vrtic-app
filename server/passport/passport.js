const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const { User } = require('../models');

// Json Web Token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // find the user specified in token
        const user = await User.findOne({ where: { id: payload.sub } });

        // if doesnt exist -> handle it
        if (!user) {
          return done(null, false);
        }

        // otherwise return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // find the user by email
        const user = await User.findOne({ where: { email } });
        // if not -> handle
        if (!user) {
          return done(null, false);
        }

        // check if password is correct
        const passwordsMatch = user.comparePassword(password);

        // if not -> handle it
        if (!passwordsMatch) {
          return done(null, false);
        }
        // success case -> return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google Oath Strategy
passport.use(
  'GooglePlusToken',
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if current user exists in DB
        const existingUser = await User.findOne({ where: { googleID: profile.id } });
        if (existingUser) {
          // user already exist in DB
          return done(null, existingUser);
        }

        // doesnt exist -> create new one
        const newUser = await User.create({
          auth_method: 'google',
          googleID: profile.id,
          email: profile.emails[0].value,
        });

        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// Facebook Oauth
passport.use(
  'FacebookToken',
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if current user exists in DB
        const existingUser = await User.findOne({ where: { facebookID: profile.id } });
        if (existingUser) {
          // user already exist in DB
          return done(null, existingUser);
        }

        // doesnt exist -> create new one
        const newUser = await User.create({
          auth_method: 'facebook',
          email: profile.emails[0].value,
          facebookID: profile.id,
        });

        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
