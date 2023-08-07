const mongoose = require("mongoose");
const { Schema } = mongoose;
const Exercise = require("./Exercise");

const workoutSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  workoutName: { type: String, required: true },
  description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    // get: (timestamp) => dateFormat(timestamp),
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Types.ObjectId,
        ref: Exercise,
      },
      totalSets: {
        type: String,
      },
      repsPerSet: {
        type: String,
      },
      untilFailure: {
        type: Boolean,
      },
      repDuration: {
        type: String,
      },
      restTime: {
        type: String,
      },
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
        // get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  //reactions: [Reaction.schema],
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
