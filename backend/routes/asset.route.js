const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const passport = require("passport");
require("../security/passport");

const assetController = require("../controllers/asset.controller");
const validate = require("../middlewares/requestValidator");

const verifyToken = require("../middlewares/authMiddleware");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Route to create an asset
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  [
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
      .isString()
      .withMessage("Email must be a string")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),
    body("data.policyNumber")
      .notEmpty()
      .withMessage("Policy number is required")
      .isLength({ min: 6, max: 10 })
      .withMessage("Policy number must be between 6 and 10 digits"),
  ],
  validate,
  assetController.createAsset
);

// Route to update an asset
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  [
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
      .isString()
      .withMessage("Email must be a string")
      .isLength({ max: 100 })
      .withMessage("Email must be no more than 100 characters long")
      .matches(emailRegex)
      .withMessage("Invalid email format"),
    body("data.policyNumber")
      .notEmpty()
      .withMessage("Policy number is required")
      .isLength({ min: 6, max: 10 })
      .withMessage("Policy number must be between 6 and 10 digits"),
    body("data.status")
      .notEmpty()
      .withMessage("Status is required")
      .isString()
      .withMessage("Status must be a string")
      .isIn(["Active", "Inactive", "Pending"])
      .withMessage("Status must be 'Active', 'Inactive', or 'Pending'"),
  ],
  validate,
  assetController.updateAsset
);

// Route to get all assets
router.get(
  "/get-all",
  passport.authenticate("jwt", { session: false }),
  assetController.getAllAssets
);

// Route to get a single asset by ID
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  assetController.getAssetById
);

// Route to get asset history by ID
router.get(
  "/history/:id",
  passport.authenticate("jwt", { session: false }),
  assetController.getAssetHistory
);

// Route to delete an asset by ID
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  assetController.deleteAsset
);

// Route to transfer an asset to a new owner
router.put(
  "/transfer",
  passport.authenticate("jwt", { session: false }),
  [
    body("assetId")
      .notEmpty()
      .withMessage("Asset ID and new owner are required.")
      .isString()
      .withMessage("Asset ID must be a string"),
    body("newOwner")
      .notEmpty()
      .withMessage("Asset ID and new owner are required.")
      .isString()
      .withMessage("New owner must be a string"),
  ],
  validate,
  assetController.transferAsset
);

module.exports = router;
