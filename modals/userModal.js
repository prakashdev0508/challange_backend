const mongoose = require("mongoose");
let validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
    password: { type: String, required: true },
    account_type: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    role: {
      type: String,
      default: "user",
    },
    prefered_categories: { type: [String], default: [] },
    follower: { type: [Object], default: [] },
    following: { type: [Object], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData", userSchema);
