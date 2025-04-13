const { Upload } = require("@aws-sdk/lib-storage");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const assetService = require("./asset.service");
const CustomError = require("../errorhandling/errorUtil");
const log = require("../logger");

// Validate AWS environment variables
const REQUIRED_ENV_VARS = [
  "AWS_REGION",
  "AWS_BUCKET_NAME",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
];

REQUIRED_ENV_VARS.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Initialize AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//Returns a list of files in S3
const listFiles = async () => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME,
  });

  const response = await s3Client.send(command);

  return response.Contents.map(obj => ({
    filename: obj.Key,
    uploadedAt: obj.LastModified,
  }));
};

/**
 * Upload a file to S3 using automatic Multipart Upload
 * @param {Object} file - File object from Multer
 * @returns {Object} - Response with uploaded filename
 */
const uploadFile = async (file, email, assetId) => {
  if (!file) throw new CustomError(`No file provided`, 404);

  const uniqueFileName = `${assetId}.pdf`;

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    },
    queueSize: 3, // Control parallel uploads
    partSize: 5 * 1024 * 1024, // Each part is 5MB
  });

  try {
    await upload.done();

    const asset = await assetService.getAssetById(email, assetId);

    if (asset) {
      const data = asset.data;
      data.fileName = uniqueFileName;
      await assetService.updateAsset(email, { id: assetId, data });
    }

    return {
      message: "Successfully Uploaded using Multipart Upload",
    };
  } catch (error) {
    log.error("Upload Failed:", error);
    throw new CustomError("Upload Failed", 400);
  }
};

/**
 * Check if the file exists in S3 before deleting
 * @param {string} fileName - The file name to check
 * @returns {boolean} - True if file exists, False otherwise
 */
const fileExists = async (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  try {
    const command = new HeadObjectCommand(params);
    await s3Client.send(command);
    return true; // File exists
  } catch (error) {
    return false; // File does not exist
  }
};

/**
 * Reupload (overwrite) a file using Multipart Upload
 * @param {string} fileName - Existing file name in S3
 * @param {Object} file - File object from Multer
 * @returns {Object} - Response with updated filename
 */
const reuploadFile = async (file, assetId, email) => {
  if (!file) throw new Error("Invalid file or filename provided");

  const asset = await assetService.getAssetById(email, assetId);

  if (!asset) throw new CustomError(`Customer not found`, 404);

  const fileName = asset.data.fileName;

  // Check if the file exists before attempting to delete
  const exists = await fileExists(fileName);
  if (!exists) throw new CustomError(`File not found: ${fileName}`, 404);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    },
    queueSize: 3, // Control parallel uploads
    partSize: 5 * 1024 * 1024, // Each part is 5MB
  });

  try {
    await upload.done();

    return {
      message: "Successfully Reuploaded using Multipart Upload",
    };
  } catch (error) {
    log.error("Upload Failed:", error);
    throw new CustomError("Upload Failed", 400);
  }
};

const generateSignedUrl = async (email, assetId) => {
  const asset = await assetService.getAssetById(email, assetId);

  if (!asset) {
    throw new CustomError(`Customer not found`, 404);
  }

  const fileName = asset.data.fileName;

  // Check if the file exists before attempting to delete
  const exists = await fileExists(fileName);
  if (!exists) throw new CustomError(`File not found: ${fileName}`, 404);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  try {
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 300, // 5 minutes
    });

    return {
      url,
      message: "URL generated successfully",
      expiresIn: "5 minutes",
    };
  } catch (error) {
    log.error("Upload Failed:", error);
    throw new CustomError("Unable to generate signed URL", 400);
  }
};

/**
 * Delete an object from S3
 * @param {string} fileName - The name of the file to delete
 * @returns {Object} - Response indicating success or failure
 */
const deleteFile = async (email, assetId) => {
  const asset = await assetService.getAssetById(email, assetId);
  const data = asset.data;

  console.log("Asset: ", asset);

  if (!asset) {
    throw new CustomError(`Customer not found`, 404);
  }

  const fileName = data.fileName;

  // Check if the file exists before attempting to delete
  const exists = await fileExists(fileName);
  if (!exists) {
    throw new CustomError(`File not found: ${fileName}`, 404);
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log(`File deleted successfully: ${fileName}`);

    await assetService.updateAsset(email, { id: assetId, asset });
    data.fileName = "N/A";
    await assetService.updateAsset(email, { id: assetId, data });

    return { message: "File deleted successfully", fileName };
  } catch (error) {
    log.error("Delete Failed:", error);
  }
};

module.exports = {
  uploadFile,
  reuploadFile,
  generateSignedUrl,
  deleteFile,
  listFiles,
};
