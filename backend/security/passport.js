// Environment Setup

// The code requires the `path` module and uses it to resolve the path to a `.env` file, which contains environment variables.
// The `dotenv` module is used to load the environment variables from the `.env` file.

// Passport Setup

// The code requires the `passport` module and sets up a JWT (JSON Web Token) strategy using the `passport-jwt` module.
// The `ExtractJwt` module is used to extract the JWT token from the request.

// Token Extraction

// A custom function `cookieExtractor` is defined to extract the JWT token from the request cookies.

// Passport Options

// An options object `opts` is created to configure the passport JWT strategy.
// The `jwtFromRequest` option is set to use the `cookieExtractor` function to extract the JWT token from the request cookies.
// The `secretOrKey` option is set to the value of the `JWT_SECRET` environment variable.

// Passport Strategy

// The passport JWT strategy is created using the `opts` object.
// The strategy uses an async function to verify the JWT token and find a user by email using the `userService` module.
// If a user is found, the strategy returns the user object. If not, it returns `false`.
// If an error occurs, the strategy returns the error.

// Export

// The configured passport instance is exported as a module.


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
