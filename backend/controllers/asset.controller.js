const assetService = require("../services/asset.service");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const createAsset = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    let payload;
    if (token) {
      payload = jwt.verify(token, process.env.JWT_SECRET);

      payload = jwt.decode(token);

      const { data } = req.body;
      const id = uuidv4(); // Generate a UUID
      const result = await assetService.createAsset(payload.id, { id, data });

      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      let payload;
      payload = jwt.verify(token, process.env.JWT_SECRET);

      payload = jwt.decode(token);

      const { id, data } = req.body;
      const result = await assetService.updateAsset(payload.id, { id, data });
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const getAllAssets = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    if (token) {
      let payload;
      payload = jwt.verify(token, process.env.JWT_SECRET);

      // If you only want the payload without verifying, use jwt.decode
      payload = jwt.decode(token);

      const assets = await assetService.getAllAssets(payload.id);
      res.status(200).json(assets);
    }
  } catch (error) {
    next(error);
  }
};

const getAssetById = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    if (token) {
      // Use jwt.verify if you need to validate the token
      let payload;
      payload = jwt.verify(token, process.env.JWT_SECRET);

      payload = jwt.decode(token);

      const assetId = req.params.id;
      const asset = await assetService.getAssetById(payload.id, assetId);
      res.status(200).json(asset);
    }
  } catch (error) {
    next(error);
  }
};

const getAssetHistory = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    if (token) {
      // Use jwt.verify if you need to validate the token
      let payload;
      payload = jwt.verify(token, process.env.JWT_SECRET);

      payload = jwt.decode(token);

      const assetId = req.params.id;
      const history = await assetService.getAssetHistory(payload.id, assetId);
      res.status(200).json(history);
    }
  } catch (error) {
    next(error);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    if (token) {
      let payload;
      payload = jwt.verify(token, process.env.JWT_SECRET);

      payload = jwt.decode(token);

      const assetId = req.params.id;
      const result = await assetService.deleteAsset(payload.id, assetId);
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const transferAsset = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      let payload;
      payload = jwt.verify(token, process.env.JWT_SECRET);

      // If you only want the payload without verifying, use jwt.decode
      payload = jwt.decode(token);

      const { assetId, newOwner } = req.body;
      const result = await assetService.transferAsset(
        payload.id,
        assetId,
        newOwner
      );
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAsset,
  updateAsset,
  getAllAssets,
  getAssetById,
  getAssetHistory,
  deleteAsset,
  transferAsset,
};
