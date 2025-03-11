const { uploadFile } = require("../services/s3.service"); // service for uploading files to S3
const multer = require("multer"); // middleware for handling file uploads

const upload = multer({ storage: multer.memoryStorage() });

const uploadDocument = async (req, res, next) => {
    try {
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