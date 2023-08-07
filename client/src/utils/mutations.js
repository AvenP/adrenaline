import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($categoryName: String!) {
    addCategory(categoryName: $categoryName) {
      categoryName
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation AddWorkout(
    $workoutName: String!
    $exercises: [WorkoutExerciseInput]!
  ) {
    addWorkout(workoutName: $workoutName, exercises: $exercises) {
      _id
      workoutName
      description
      createdAt
      exercises {
        _id
        repDuration
        repsPerSet
        restTime
        totalSets
        untilFailure
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise(
    $exerciseName: String!
    $description: String
    $category: ID!
  ) {
    addExercise(
      exerciseName: $exerciseName
      description: $description
      category: $category
    ) {
      _id
      exerciseName
      description
      category {
        _id
        categoryName
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($workoutId: ID!, $commentText: String!) {
    addComment(workoutId: $workoutId, commentText: $commentText) {
      _id
      workoutName
    }
  }
`;
