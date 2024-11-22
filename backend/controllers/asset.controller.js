const assetService = require("../services/asset.service");
const { v4: uuidv4 } = require("uuid");

const createAsset = async (req, res, next) => {
  try {
    const { data } = req.body;
    const id = uuidv4(); // Generate a UUID
    const result = await assetService.createAsset({ id, data });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const { id, data } = req.body;
    const result = await assetService.updateAsset({ id, data });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await assetService.getAllAssets();
    res.status(200).json(assets);
  } catch (error) {
    next(error);
  }
};

const getAssetById = async (req, res, next) => {
  try {
    const assetId = req.params.id;
    const asset = await assetService.getAssetById(assetId);
    res.status(200).json(asset);
  } catch (error) {
    next(error);
  }
};

const getAssetHistory = async (req, res, next) => {
  try {
    const assetId = req.params.id;
    const history = await assetService.getAssetHistory(assetId);
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    const assetId = req.params.id;
    const result = await assetService.deleteAsset(assetId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const transferAsset = async (req, res, next) => {
  try {
    const { assetId, newOwner } = req.body;
    if (!assetId || !newOwner) {
      return res
        .status(400)
        .json({ message: "Asset ID and new owner are required." });
    }
    const result = await assetService.transferAsset(assetId, newOwner);
    res.status(200).json(result);
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
