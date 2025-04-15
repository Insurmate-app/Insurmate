const {
  evaluateTransaction,
  submitTransaction,
} = require("../blockchain/backend/src/chaincodeHelper");
const userService = require("./user.service");
const CustomError = require("../errorhandling/errorUtil");
const log = require("../logger");

// TODO: Hardcoded values for now; replace with environment variables / mongoDB if needed
const userId = "admin";
const org1 = "org1"; // for regular user
const org2 = "org2"; // for admin user
const channel = "mychannel";
const chaincodeName = "basic";

function whichOrg(role) {
  return role === "admin" ? org2 : org1;
}

// Create an Asset
const createAsset = async (email, data) => {
  try {
    const user = await userService.findUserByEmail(email);

    const asset = data.data || {};

    asset.owner = user._id;

    asset.status = "Pending";
    asset.fileName = "N/A";
    asset.llmResponse = "N/A";

    const org = whichOrg(user.role);

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
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error creating asset", 500);
    }
  }
};

const updateAssetWhileUploadingDocument = async (email, data) => {
  try {
    const asset = await getAssetById(email, data.id);

    data.data.owner = asset?.data?.owner;

    const user = await userService.findUserByEmail(email);
    
    if (!data.data.status?.trim()) {
      data.data.status = asset?.data?.status;
    }

    const org = whichOrg(user.role);

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
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error updating asset", 500);
    }
  }
};

const updateAsset = async (email, data) => {
  try {
    const asset = await getAssetById(email, data.id);

    data.data.owner = asset?.data?.owner;
    data.data.llmResponse = asset?.data?.llmResponse;

    const user = await userService.findUserByEmail(email);

    if (!data.data.status?.trim()) {
      data.data.status = asset?.data?.status;
    }

    const org = whichOrg(user.role);

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
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error updating asset", 500);
    }
  }
};

// Retrieve All Assets
const getAllAssets = async (email) => {
  try {
    const user = await userService.findUserByEmail(email);

    const role = user.role;

    // if (role !== "admin") {
    //   throw new CustomError("Regular user cannot retrieve all assets", 403);
    // }
    const org = whichOrg(role);

    const result = await evaluateTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "GetAllAssets"
    );
    let assets = JSON.parse(result);
    // TODO:Map the owner field to the user's full name
    // assets = await Promise.all(
    //   assets.map(async (asset) => {
    //     const ownerUser = await userService.findUserById(asset.owner); // Retrieve user by owner
    //     console.log(ownerUser);
    //     return {
    //       ...asset,
    //       owner: ownerUser
    //         ? `${ownerUser.firstName} ${ownerUser.lastName}`
    //         : asset.owner, // Fallback to original owner if user not found
    //     };
    //   })
    // );
    return assets;
  } catch (error) {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error retrieving assets", 500);
    }
  }
};

const getAssetById = async (email, assetId) => {
  try {
    const user = await userService.findUserByEmail(email);

    const org = whichOrg(user.role);

    const result = await evaluateTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "ReadAsset",
      assetId
    );

    const resultJSON = JSON.parse(result);

    if (
      user.role !== "admin" &&
      resultJSON.data.owner.toString() !== user._id.toString()
    ) {
      throw new CustomError(
        "You do not have permission to access this asset",
        403
      );
    }

    return resultJSON;
  } catch (error) {
    if (error.message && error.message.toLowerCase().includes("does not exist"))
      throw CustomError(`Asset not found${assetId ? `: ${assetId}` : ""}`, 404);
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error retrieving asset", 500);
    }
  }
};

const getAssetHistory = async (email, assetId) => {
  try {
    await getAssetById(email, assetId);

    const user = await userService.findUserByEmail(email);

    const org = whichOrg(user.role);

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
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error getting asset history", 500);
    }
  }
};

const deleteAsset = async (email, assetId) => {
  try {
    await getAssetById(email, assetId);

    const user = await userService.findUserByEmail(email);

    const org = whichOrg(user.role);

    await submitTransaction(
      userId,
      org,
      channel,
      chaincodeName,
      "DeleteAsset",
      assetId
    );

    // await s3Service.deleteFile(assetId, email, assetId);
    return { message: `Asset with ID ${assetId} has been deleted.` };
  } catch (error) {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error deleting asset", 500);
    }
  }
};

async function transferAsset(email, assetId, newOwner) {
  try {
    const user = await userService.findUserByEmail(email);

    const org = whichOrg(user.role);

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
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Error transferring asset", 500);
    }
  }
}

module.exports = {
  createAsset,
  updateAsset,
  updateAssetWhileUploadingDocument,
  getAllAssets,
  getAssetById,
  getAssetHistory,
  deleteAsset,
  transferAsset,
};
