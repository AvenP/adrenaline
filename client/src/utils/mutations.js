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

export const ADD_WORKOUT = gql`
mutation addWorkout( exercises: $exercise ){
  addWorkout(exercises: $exercise) {
    workoutName
    description
    createdAt
    exercises {
      _id
      exerciseName
      description
      category{
        categoryName
      }
    }
  }
}`;

export const ADD_EXERCISE = gql`
mutation addExercise( exercises: $exercise ){
  addExercise(exercises: $exercise) {
    exerciseName
    description
    category {
      categoryName
    }
    # comment
  }
}`;

// export const ADD_COMMENT = gql`
//   mutation addComment(
//     $workoutId: ID!
//     $commentText: String!
//     $commentAuthor: String!
//   ) {
//     addComment(
//       workoutId: $workoutId
//       commentText: $commentText
//       commentAuthor: $commentAuthor
//     ) {
//       _id
//       description

//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
