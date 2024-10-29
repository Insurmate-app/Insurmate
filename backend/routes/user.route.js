const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../security/passport"); // Import Passport JWT configuration

const validate = require("../middlewares/requestValidator");
const { check } = require("express-validator");
const userController = require("../controllers/user.controller");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

router.post(
  "/create",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),

    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 28 })
      .withMessage("Password must be between 8 and 28 characters long")
      .matches(passwordRegex)
      .withMessage(
        "Password must contain at least one uppercase letter and one special character"
      ),

    check("companyName")
      .notEmpty()
      .withMessage("Company name is required")
      .isLength({ min: 8, max: 28 })
      .withMessage("Company name must be between 8 and 28 characters long"),

    check("address.addressLine1")
      .notEmpty()
      .withMessage("Address line 1 is required")
      .isLength({ max: 300 })
      .withMessage("Address line 1 must be no more than 300 characters long"),

    check("address.addressLine2")
      .optional() // Allow this field to be optional
      .isLength({ max: 50 })
      .withMessage("Address line 2 must be no more than 50 characters long"),

    check("address.city")
      .notEmpty()
      .withMessage("City is required")
      .isLength({ max: 30 })
      .withMessage("City must be no more than 30 characters long"),

    check("address.state")
      .notEmpty()
      .withMessage("State is required")
      .isLength({ max: 30 })
      .withMessage("State must be no more than 30 characters long"),

    check("address.zipCode")
      .notEmpty()
      .withMessage("Zip code is required")
      .isLength({ max: 30 })
      .withMessage("Zip code must be no more than 30 characters long"),
  ],
  validate,
  userController.createUser
);

router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),

    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 28 })
      .withMessage("Password must be between 8 and 28 characters long")
      .matches(passwordRegex)
      .withMessage(
        "Password must contain at least one uppercase letter and one special character"
      ),
  ],
  validate,
  userController.loginUser
);

router.post(
  "/verify",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),

    check("otpToken")
      .notEmpty()
      .withMessage("OTP Token is required")
      .isNumeric()
      .isLength({ max: 6 })
      .withMessage("OTP Token must be no more than 6 digits or less than long"),
  ],
  validate,
  userController.verifyUser
);

router.put(
  "/reset-password",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),

    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 28 })
      .withMessage("Password must be between 8 and 28 characters long")
      .matches(passwordRegex)
      .withMessage(
        "Password must contain at least one uppercase letter and one special character"
      ),
  ],
  validate,
  userController.resetPassword
);

router.post(
  "/regenerate-otp",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),
  ],
  validate,
  userController.regenerateOtp
);

router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userController.logoutUser
);

module.exports = router;
