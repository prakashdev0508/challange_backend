const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeSchema = new Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    description: { type: String, required: true },
    challenge_name: { type: String, required: true },
    challenge_date: { type: Date, required: true },
    challenge_end_date: { type: Date, required: true },
    challenge_type: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    challange_category: { type: String, required: true, ref: "Category" },
    upvotes: { type: [Object], default: [] },
    upvotes_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
