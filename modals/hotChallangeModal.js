const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotChallangeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
    join: { type: [Object], default: [] },
    join_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const HotChallange = mongoose.model("HotChallange", hotChallangeSchema);

module.exports = HotChallange;
