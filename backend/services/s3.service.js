const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

dotenv.config();

// Set up AWS credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // need to find this
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => { // take file from multer

  // uuid for unique file name
  const uniqueFileName = `${uuidv4()}-${file.originalname}`;

  // Create a read stream for file stored on disk
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uniqueFileName,
    Body: fileStream, // stream
    ContentType: file.mimetype,
  };

  try {
    
    await s3Client.send(new PutObjectCommand(params));

    console.log('File uploaded successfully', uniqueFileName); // test

    // need to return the url of the file if it uplaods successfully
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
    return url;

  } catch (error) {
    console.error("Upload Failed", error);
    throw new Error("Upload Failed");
  }
};

module.exports = {
  uploadFile,
};