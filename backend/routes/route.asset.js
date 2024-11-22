// routes/asset.routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../security/passport");
const assetController = require("../controllers/asset.controller");
const assetValidationRules = require("../middlewares/assetValidators");
const validate = require("../middlewares/requestValidator");

router.post(
  "/create-asset",
  passport.authenticate("jwt", { session: false }),
  assetValidationRules,
  validate,
  assetController.createAsset
);

router.put(
  "/update-asset",
  passport.authenticate("jwt", { session: false }),
  assetValidationRules,
  validate,
  assetController.updateAsset
);

router.get(
  "/assets",
  passport.authenticate("jwt", { session: false }),
  assetController.getAllAssets
);

router.get(
  "/asset/:id",
  passport.authenticate("jwt", { session: false }),
  assetController.getAssetById
);

router.get(
  "/asset-history/:id",
  passport.authenticate("jwt", { session: false }),
  assetController.getAssetHistory
);

router.delete(
  "/delete-asset/:id",
  passport.authenticate("jwt", { session: false }),
  assetController.deleteAsset
);

router.put(
  "/asset/transfer",
  passport.authenticate("jwt", { session: false }),
  [
    body("assetId")
      .notEmpty()
      .withMessage("Asset ID is required")
      .isString()
      .withMessage("Asset ID must be a string"),
    body("newOwner")
      .notEmpty()
      .withMessage("New owner is required")
      .isString()
      .withMessage("New owner must be a string"),
  ],
  validate,
  assetController.transferAsset
);

module.exports = router;