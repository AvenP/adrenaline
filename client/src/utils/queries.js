import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      username
      email
      workouts {
        _id
        workoutName
        description
        createAt
        exercises {
          _id
          exerciseName
          description
        }
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_ALL_EXERCISES = gql`
  {
    exercises {
      _id
      exerciseName
      description
      category {
        name
      }
    }
  }
`;

export const QUERY_EXERCISES = gql`
  query getExercises($category: ID) {
    exercises(category: $category) {
      _id
      name
      description
      category {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workouts {
        _id
        workoutName
        description
        createdAt
      }
    }
  }
`;
