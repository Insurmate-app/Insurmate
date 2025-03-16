const express = require("express");
const multer = require("multer"); //handles multiple file uploads
const fs = require("fs");
const path = require("path");
const router = express.Router();

//Defines the upload path as uploads directory for now until S3 support
const uploadDir = path.join(__dirname, "../../uploads")

//Ensure Directory exists
fs.mkdirSync(uploadDir, { recursive: true});

//Create multer object for file storage
const upload = multer({ dest: uploadDir });

//Define POST route for file uploads
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file){
        return res.status(400).json({ error: "No file uploaded." });
    }

    res.json({
        message: "File uploaded successfully!",
        filename: req.file.filename,
        originalname: req.file.originalname,
        filePath: `/uploads/${req.file.filename}`,
    });
});

module.exports = router;