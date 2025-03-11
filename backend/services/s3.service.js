const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

// Set up AWS credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // need to find this
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));

    console.log('File uploaded successfully'); // test

    // need to return the url of the file if it uplaods successfully
    //return url;

  } catch (error) {
    console.error("Upload Failed", error);
    throw new Error("Upload Failed");
  }
};

module.exports = {
  uploadFile,
};