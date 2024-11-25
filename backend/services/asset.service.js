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

    data.data.owner = user._id;

    const org = whichOrg(user.role);

    data.status = "pending";

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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error creating asset", 500); // Convert to 500 and re-throw
    }
  }
};

// Update an Asset
const updateAsset = async (email, data) => {
  try {
    const asset = getAssetById(email, data.id);

    data.data.owner = asset.data.owner;

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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error updating asset", 500); // Convert to 500 and re-throw
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
    const org = role === "admin" ? org2 : org1;
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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error retrieving assets", 500); // Convert to 500 and re-throw
    }
  }
};

// Retrieve an Asset by ID
const getAssetById = async (email, assetId) => {
  try {
    const user = await userService.findUserByEmail(email);

    const org = whichOrg(user.role);

    console.log(org);

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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error retrieving asset", 500); // Convert to 500 and re-throw
    }
  }
};

// Get Asset History
const getAssetHistory = async (email, assetId) => {
  try {
    getAssetById(email, assetId);

    const org = user.isAdmin ? org2 : org1;

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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error getting asset history", 500); // Convert to 500 and re-throw
    }
  }
};

// Delete an Asset
const deleteAsset = async (email, assetId) => {
  try {
    getAssetById(email, assetId);

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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error deleting asset", 500); // Convert to 500 and re-throw
    }
  }
};

// Transfer an Asset to a New Owner
async function transferAsset(email, assetId, newOwner) {
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
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Error transferring asset", 500); // Convert to 500 and re-throw
    }
  }
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
