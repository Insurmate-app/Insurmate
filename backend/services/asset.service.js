const {
  evaluateTransaction,
  submitTransaction,
} = require("../blockchain/backend/src/chaincodeHelper");
const CustomError = require("../errorhandling/errorUtil");

// Hardcoded values for now; replace with environment variables if needed
const userId = "admin";
const org = "org1";
const channel = "mychannel";
const chaincodeName = "basic";

// Create an Asset
async function createAsset(data) {
  try {
    const result = await submitTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "CreateAsset",
      JSON.stringify(data)
    );
    return JSON.parse(result);
  } catch (error) {
    handleServiceError(error, "Error creating asset");
  }
}

// Update an Asset
async function updateAsset(data) {
  try {
    const result = await submitTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "UpdateAsset",
      JSON.stringify(data)
    );
    return JSON.parse(result);
  } catch (error) {
    handleServiceError(error, "Error updating asset");
  }
}

// Retrieve All Assets
async function getAllAssets() {
  try {
    const result = await evaluateTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "GetAllAssets"
    );
    return JSON.parse(result);
  } catch (error) {
    handleServiceError(error, "Error retrieving all assets");
  }
}

// Retrieve an Asset by ID
async function getAssetById(assetId) {
  try {
    const result = await evaluateTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "ReadAsset",
      assetId
    );
    return JSON.parse(result);
  } catch (error) {
    handleServiceError(error, "Error retrieving asset", assetId);
  }
}

// Get Asset History
async function getAssetHistory(assetId) {
  try {
    const result = await evaluateTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "GetAssetHistory",
      assetId
    );
    return JSON.parse(result);
  } catch (error) {
    handleServiceError(error, "Error retrieving asset history", assetId);
  }
}

// Delete an Asset
async function deleteAsset(assetId) {
  try {
    await submitTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "DeleteAsset",
      assetId
    );
    return { message: `Asset with ID ${assetId} has been deleted.` };
  } catch (error) {
    handleServiceError(error, "Error deleting asset", assetId);
  }
}

// Transfer an Asset to a New Owner
async function transferAsset(assetId, newOwner) {
  try {
    const result = await submitTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "TransferAsset",
      assetId,
      newOwner
    );
    return { assetId, newOwner, oldOwner: result };
  } catch (error) {
    handleServiceError(error, "Error transferring asset", assetId);
  }
}

function handleServiceError(error, defaultMessage, assetId = "") {
  console.log(error.message); // Log the error message for debugging
  if (error.message && error.message.toLowerCase().includes("does not exist"))
    throw CustomError(`Asset not found${assetId ? `: ${assetId}` : ""}`, 404);

  // Handle cases where the error doesn't match "does not exist"
  throw CustomError(
    `${defaultMessage}: ${error.message || "Unknown error"}`,
    500
  );
}

module.exports = {
  createAsset,
  updateAsset,
  getAllAssets,
  getAssetById,
  getAssetHistory,
  deleteAsset,
  transferAsset,
};
