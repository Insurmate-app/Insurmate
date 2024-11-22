const { body } = require("express-validator");
const assetValidationRules = [
  body("id")
    .notEmpty()
    .withMessage("Asset ID is required")
    .isString()
    .withMessage("Asset ID must be a string"),
  body("data.firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),
  body("data.lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),
  body("data.email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 100 })
    .withMessage("Email must be no more than 100 characters long")
    .isEmail()
    .withMessage("Invalid email format"),
  body("data.policyNumber")
    .notEmpty()
    .withMessage("Policy number is required")
    .isNumeric()
    .withMessage("Policy number must be numeric")
    .isLength({ min: 6, max: 10 })
    .withMessage("Policy number must be between 6 and 10 digits"),
  body("data.owner")
    .notEmpty()
    .withMessage("Owner is required")
    .isString()
    .withMessage("Owner must be a string"),
  body("data.status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Active", "Inactive", "Pending"])
    .withMessage("Status must be 'Active', 'Inactive', or 'Pending'"),
];
module.exports = {
  assetValidationRules,
};