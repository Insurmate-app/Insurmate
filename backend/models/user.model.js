const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Regex for basic email validation
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    companyName: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
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
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
        maxLength: 300,
      },
      addressLine2: {
        type: String,
        maxLength: 50,
      },
      city: {
        type: String,
        required: true,
        maxLength: 30,
      },
      state: {
        type: String,
        required: true,
        maxLength: 30,
      },
      zipCode: {
        type: String,
        required: true,
        maxLength: 30,
      },
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 50,

    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    wallet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
