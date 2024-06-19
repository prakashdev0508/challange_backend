const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
