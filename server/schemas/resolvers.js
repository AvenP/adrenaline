const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Exercise, Workout } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require('bcrypt');


const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    exercises: async (parent, { category, exerciseName }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (exerciseName) {
        params.exerciseName = {
          $regex: exerciseName,
        };
      }

      return await Exercise.find(params).populate("category");
    },
    exercise: async (parent, { _id }) => {
      return await Exercise.findById(_id).populate("category");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "workout.exercises",
          populate: "category",
        });

        return user;
      }
      throw new AuthenticationError("Not logged in!");
    },
    workout: async (parent, { _id }, context) => {
      if (context.user) {
        const user = User.findById(context.user._id).populate({
          path: "workouts.exercises",
          populate: "category",
        });
        return user.workouts.id(_id);
      }
      throw new AuthenticationError("Not logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const { username, email, password } = args;

        // Hash the user's password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        // Generate a token for the new user
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred during user registration');
      }
    },

    updateUser: async (parent, args, context) => {
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        // Compare the entered password with the hashed password in the database
        const correctPw = await bcrypt.compare(password, user.password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        // If the password is correct, generate a token for the user
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err); // Log the error to the console
        throw new AuthenticationError("An error occurred during login");
      }
    },
    //addExercise needs work
    addExercise: async (parent, args, context) => {
      if (context.user) {
        const exercise = await Exercise.create(args); //check returned data

        // await Category.findOneAndUpdate({
        //   $addToSet: { exercises: exercise._id },
        // });
        return exercise;
      }
      throw new AuthenticationError("Not logged in");
    },
    addCategory: async (parent, args, context) => {
      if (context.user) {
        const category = await Category.create(args);

        return category;
      }
    },
    addWorkout: async (parent, { exercises }, context) => {
      console.log(context);
      if (context.user) {
        const workout = new Workout({ exercises });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { workouts: workout },
        });

        return workout;
      }
      throw new AuthenticationError("Not logged in");
    },
    addComment: async (parent, { workoutId, commentText, commentAuthor }) => {
      return Workout.findOneAndUpdate(
        { _id: workoutId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updateExercise: async (parent, args, context) => {
      if (context.user) {

        return await Exercise.findByIdAndUpdate(Exercise._id, args, {

          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    updateCategory: async (parent, args, context) => {
      if (context.user) {

        return await Category.findByIdAndUpdate(Category._id, args, {

          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    updateWorkout: async (parent, args, context) => {
      if (context.user) {

        return await Workout.findByIdAndUpdate(Workout._id, args, {

          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
