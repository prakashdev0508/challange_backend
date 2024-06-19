const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailyUpdateSchema = new Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    challenge_id: { type: String, required: true, ref: "Challenge" },
    description: { type: String, required: true },
    links_shared: { type: [String], default: [] },
  },
  { timestamps: true }
);

const DailyUpdate = mongoose.model("DailyUpdate", dailyUpdateSchema);

module.exports = DailyUpdate;
