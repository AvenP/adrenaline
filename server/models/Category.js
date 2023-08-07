const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  // createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  categoryName: { type: String, required: true },
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
