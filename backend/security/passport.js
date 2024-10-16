const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Explicitly set the path to .env

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const userService = require("../services/user.service");

// Function to extract token from cookies
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token; // 'token' is the name of the cookie set in the login route
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET, // Ensure this is correctly set
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await userService.findUserByEmail(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
