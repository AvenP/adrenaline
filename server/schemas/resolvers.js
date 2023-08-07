const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Exercise, Workout } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    exercises: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.exerciseName = {
          $regex: exerciseName,
        };
      }

      return await Exercise.find(params).populate("category");
    },
    exercise: async (parent, { _id }) => {
      return await Exercise.findById(_id).populate("category");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });

        const workouts = await Workout.find({
          createdBy: user._id,
        }).populate({
          path: "exercises.exercise",
          populate: {
            path: "category",
          },
        });

        user.workouts = workouts;

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    userData: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: args.userId });

        const workouts = await Workout.find({
          createdBy: user._id,
        }).populate({
          path: "exercises.exercise",
          populate: {
            path: "category",
          },
        });

        user.workouts = workouts;

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    workout: async (parent, { workoutId }, context) => {
      const findWorkout = await Workout.findById(workoutId)
        .populate({
          path: "exercises.exercise",
          populate: {
            path: "category",
          },
        })
        .populate("comments.commentAuthor")
        .populate("createdBy", "username");

      return findWorkout;
    },
    workouts: async (parent, args, context) => {
      const params = {};
      if (context.user) {
        params.createdBy = context.user._id;
      }
      const findWorkout = await Workout.find(params)
        .populate({
          path: "exercises.exercise",
          populate: {
            path: "category",
          },
        })
        .populate("createdBy", "username")
        .populate("comments.commentAuthor");

      return findWorkout;
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
        throw new Error("An error occurred during user registration");
      }
    },

    updateUser: async (parent, args, context) => {},

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        // Compare the entered password with the hashed password in the database
        const correctPw = await bcrypt.compare(password, user.password);
        console.log(password, user.password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }
        const workouts = await Workout.find({ createdBy: user._id }).populate({
          path: "exercises.exercise",
          populate: {
            path: "category",
          },
        });

        user.workouts = workouts;
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
        const { exerciseName, description, category } = args;
        const exercise = await Exercise.create({
          exerciseName,
          description,
          category,
          comments: [],
        }); //check returned data

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
    addWorkout: async (
      parent,
      { exercises, workoutName, description },
      context
    ) => {
      console.log(context);
      if (context.user) {
        const workout = await Workout.create({
          exercises,
          workoutName,
          description,
          comments: [],
          createdBy: context.user._id,
        });

        const findWorkout = await Workout.findById(workout._id).populate({
          path: "exercises.exercise",
          populate: {
            path: "category",
          },
        });
        // console.log(findWorkout);
        return findWorkout;
      }
      throw new AuthenticationError("Not logged in");
    },
    addComment: async (parent, { workoutId, commentText }, context) => {
      if (context.user) {
        return await Workout.findOneAndUpdate(
          { _id: workoutId },
          {
            $push: {
              comments: { commentText, commentAuthor: context.user._id },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    updateExercise: async (
      parent,
      { exerciseId, exerciseName, description, category },
      context
    ) => {
      if (context.user) {
        return await Exercise.findByIdAndUpdate(
          exerciseId,
          { exerciseName, description, category },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    updateCategory: async (parent, { categoryName, categoryId }, context) => {
      if (context.user) {
        return await Category.findByIdAndUpdate(
          categoryId,
          {
            categoryName,
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    updateWorkout: async (parent, args, context) => {
      if (context.user) {
        return await Workout.findByIdAndUpdate(args.workoutId, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    removeCategory: async (_, args, context) => {
      if (context.user) {
        await Category.findByIdAndRemove(args.categoryId);

        await Exercise.deleteMany({ category: args.categoryId });

        return "Category deleted successfully.";
      }
      throw new AuthenticationError("Not logged in");
    },
    removeWorkout: async (_, args, context) => {
      if (context.user) {
        await Workout.findByIdAndRemove(args.workoutId);

        return "Workout deleted successfully.";
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
