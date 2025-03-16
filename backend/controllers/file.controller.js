const { uploadFile } = require("../services/s3.service"); // service for uploading files to S3
const multer = require("multer"); // middleware for handling file uploads

const upload = multer();

const uploadDocument = async (req, res, next) => {
    try {
        console.log("Incoming request received");
        console.log("Headers:", req.headers); 
        console.log("Body:", req.body); 
        console.log("File:", req.file); 

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = await uploadFile(req.file);

        return res.status(201).json({ file: file });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

  };

  
module.exports = {
    uploadDocument,
    upload,

};