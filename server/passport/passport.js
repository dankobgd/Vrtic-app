const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

// Json Web Token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
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
