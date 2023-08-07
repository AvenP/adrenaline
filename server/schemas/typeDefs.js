const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Category {
    _id: ID
    categoryName: String
  }
  type Comment {
    _id: ID
    commentAuthor: String
    commentText: String
    createdAt: String
  }
  type Exercise {
    _id: ID
    exerciseName: String
    description: String
    category: Category
    comments: [Comment]
  }
  type User {
    _id: ID
    username: String
    email: String
    workouts: [Workout]
  }
  type Auth {
    token: ID
    user: User
  }
  type WorkoutExercise {
    _id: ID
    exercise: Exercise
    totalSets: String
    repsPerSet: String
    untilFailure: Boolean
    repDuration: String
    restTime: String
  }
  type Workout {
    _id: ID
    workoutName: String
    description: String
    createdAt: String
    exercises: [Exercise]
    comments: [Comment]
    # reactions: [Reaction]
  }
  input WorkoutExerciseInput {
    exercise: ID!
    totalSets: String
    repsPerSet: String
    untilFailure: Boolean
    repDuration: String
    restTime: String
  }
  type Query {
    me: User
    userData(userId: ID!): User
    categories: [Category]
    exercises(category: ID, name: String): [Exercise]
    exercise(_id: ID): Exercise
    user: User
    workout(workoutId: ID): Workout
    workouts: [Workout]
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addExercise(
      exerciseName: String!
      description: String
      category: ID!
    ): Exercise
    addCategory(categoryName: String!): Category
    addWorkout(
      workoutName: String
      description: String
      exercises: [ID]!
    ): Workout
    addComment(
      workoutId: ID!
      commentText: String!
      commentAuthor: String!
    ): Workout
    updateExercise(
      exerciseName: String
      description: String
      category: ID
      exerciseId: ID!
    ): Exercise
    updateCategory(categoryId: ID!, categoryName: String!): Category
    updateWorkout(
      workoutId: ID!
      workoutName: String
      description: String
      exercises: [WorkoutExerciseInput]
    ): Workout
    removeCategory(categoryId: ID!): String
    removeWorkout(workoutId: ID!): String
    removeComment(workoutId: ID!, commentId: ID!): String
  }
`;

module.exports = typeDefs;
