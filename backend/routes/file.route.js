const express = require("express");
const { uploadDocument, upload } = require("../controllers/file.controller");

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  uploadDocument
);

module.exports = router;