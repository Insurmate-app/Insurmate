const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileController = require("../controllers/file.controller");
const passport = require("passport");
require("../security/passport"); // Import Passport JWT configuration

const s3Service = require("../services/s3.service");

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024, // 1MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// Upload a new file
router.post(
  "/upload/:assetId",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  fileController.uploadFileHandler
);

// Re-upload a file
router.put(
  "/reupload/:assetId",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  fileController.reuploadFileHandler
);

// Generate signed URL for file download
router.get(
  "/signed-url/:assetId",
  passport.authenticate("jwt", { session: false }),
  fileController.generateSignedUrlHandler
);

router.get(
  "/list/:fileName",
  passport.authenticate("jwt", { session: false }),
  fileController.listFilesHandler
);

router.delete(
  "/delete/:assetId",
  passport.authenticate("jwt", { session: false }),
  fileController.deleteFileHandler
);

module.exports = router;
