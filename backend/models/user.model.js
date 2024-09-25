const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
      required: true,
    },
    activeAccount: {
      type: Boolean,
      default: true,
      required: true,
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
