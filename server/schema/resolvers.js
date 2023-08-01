const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Exercise, Workout } = require("../models");
const { signToken } = require("../utils/auth");
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
  Mutations: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    //addExercise needs work
    addExercise: async (parent, args, context) => {
      if (context.user) {
        const exercise = await Exercise.create(args); //check returned data

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
    updateExercise: async (parent, args, context) => {
      if (context.user) {
        return await Exercise.findByIdAndUpdate(exercise._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    updateCategory: async (parent, args, context) => {
      if (context.user) {
        return await Category.findByIdAndUpdate(category._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    updateWorkout: async (parent, args, context) => {
      if (context.user) {
        return await Workout.findByIdAndUpdate(workout._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
