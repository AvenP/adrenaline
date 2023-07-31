const mongoose = require("mongoose");
const { Schema } = mongoose;
const workoutSchema = new Schema({
  workoutName: { type: String, required: true },
  description: { type: String },
  exercises: [
    {
      type: Schema.Type.ObjectId,
      ref: Exercise,
    },
  ],
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
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
