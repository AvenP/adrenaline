const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  userName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, minLength: 8 },
  workouts: [Workout.schema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
