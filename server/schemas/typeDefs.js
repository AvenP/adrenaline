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
    # reactions: [Reaction]
  }
  type User {
    _id: ID
    name: String
    nameUser: String
    email: String
    workouts: [Workout]
  }
  type Auth {
    token: ID
    user: User
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
  type Query {
    categories: [Category]
    exercises(category: ID, name: String): [Exercise]
    exercise(_id: ID): Exercise
    user: User
    workout(_id: ID): Workout
    workouts(user: ID, name: String): [Workout]
  }
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
    addExercise(
      exerciseName: String!
      description: String
      category: Category
    ): Exercise
    addCategory(categoryName: String!): Category
    addWorkout(
      workoutName: String
      description: String
      exercises: [Exercise]
    ): Workout
    addComment(
      workoutId: ID!
      commentText: String!
      commentAuthor: String!
    ): Workout
    updateExercise(
      exerciseName: String!
      description: String
      category: Category
    ): Exercise
    updateCategory(categoryName: String!): Category
    updateWorkout(
      workoutName: String
      description: String
      exercises: [Exercise]
    ): Workout
    removeCategory(categoryId: ID!): Category
    removeWorkout(workoutId: ID!): Workout
    removeComment(workoutId: ID!, commentId: ID!): Workout
  }
`;

module.exports = typeDefs;
