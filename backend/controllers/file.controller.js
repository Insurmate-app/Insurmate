const { uploadFile } = require("../services/s3.service"); // service for uploading files to S3
const multer = require("multer"); // middleware for handling file uploads
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../uploads"); // makes sure that /uploads exists in project directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); //names the file with format currentdate-filename
    }
});

const upload = multer({ storage: storage });

const uploadDocument = async (req, res, next) => {
    try {
        console.log("Incoming request received");
        console.log("Headers:", req.headers); 
        console.log("Body:", req.body); 
        console.log("File:", req.file); 

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        // Upload file
        const file = await uploadFile(req.file);

        // Overwrite, then delete file from ../uploads
        fs.writeFile(req.file.path, "", (err) => {
            if (err) console.error("Error overwriting file:", err);

            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error deleting file:", err);
                else console.log("File securely deleted:", req.file.path);
            });
        });


        return res.status(201).json({ file: file });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

  };

  
module.exports = {
    uploadDocument,
    upload,

};