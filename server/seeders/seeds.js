const db = require("../config/connection");
const { User, Exercise, Category } = require("../models");
const userSeeds = require("./userSeeds.json");
const categorySeeds = require("./categorySeeds.json");
const exerciseSeeds = require("./exerciseSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    await Exercise.deleteMany({});
    await Exercise.create(exerciseSeeds);

    await Category.deleteMany({});
    await Category.create(categorySeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
