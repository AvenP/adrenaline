const mongoose = require("mongoose");
const { Schema } = mongoose;
const Workout = require("./Workout");
const bcrypt = require("bcrypt"); // Import bcrypt library

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, minLength: 8 },
  workouts: [Workout.schema],
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
