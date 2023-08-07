const mongoose = require("mongoose");
const { Schema } = mongoose;
const exerciseSchema = new Schema({
  // createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  exerciseName: { type: String, required: true },
  description: { type: String },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  //reactions: [Reaction.schema],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
