const {
  uploadFile,
  reuploadFile,
  generateSignedUrl,
  deleteFile,
  listFiles,
} = require("../services/s3.service");
const jwt = require("jsonwebtoken");
const extractToken = require("../util/tokenExtractor");

/**
 * Handle file upload request
 */
const uploadFileHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token);
    const payloadId = payload.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { assetId } = req.params;
    if (!assetId) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const result = await uploadFile(req.file, payloadId, assetId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle file reupload request
 */
const reuploadFileHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token);
    const payloadId = payload.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { assetId } = req.params;
    if (!assetId) {
      return res.status(400).json({ error: "Asset id is required" });
    }

    const result = await reuploadFile(req.file, assetId, payloadId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to generate a signed URL
 */
const generateSignedUrlHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token);
    const payloadId = payload.id;

    const { assetId } = req.params;
    if (!assetId) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const result = await generateSignedUrl(payloadId, assetId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteFileHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token);
    const payloadId = payload.id;

    const { assetId } = req.params;

    if (!assetId) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const result = await deleteFile(payloadId, assetId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listFilesHandler = async (req, res, next) => {
  try {
    const { fileName } = req.params;
    const files = await listFiles(fileName);
    res.json(files);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFileHandler,
  reuploadFileHandler,
  generateSignedUrlHandler,
  deleteFileHandler,
  listFilesHandler,
};
