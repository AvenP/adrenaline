import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query UserData($userId: ID!) {
    userData(userId: $userId) {
      _id
      email
      username
      workouts {
        _id
        createdBy {
          _id
          username
        }
        workoutName
        description
        createdAt
        exercises {
          _id
          repsPerSet
          exercise {
            _id
            category {
              _id
              categoryName
            }
            exerciseName
            description
          }
        }
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      categoryName
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
        _id
        categoryName
      }
    }
  }
`;

export const QUERY_EXERCISES = gql`
  query getExercises($category: ID) {
    exercises(category: $category) {
      _id
      exerciseName
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

export const QUERY_WORKOUTS = gql`
  {
    workouts {
      _id
      createdBy {
        _id
        username
      }
      workoutName
      description
      createdAt
      exercises {
        _id
        repsPerSet
        exercise {
          _id
          category {
            _id
            categoryName
          }
          exerciseName
          description
        }
      }
    }
  }
`;

export const QUERY_SINGLE_WORKOUT = gql`
  query workout($workoutId: ID) {
    workout(workoutId: $workout) {
      _id
      createdBy {
        _id
        username
      }
      workoutName
      description
      createdAt
      exercises {
        _id
        repDuration
        restTime
        exercise {
          _id
          exerciseName
          category {
            _id
            categoryName
          }
        }
      }
      comments {
        _id
        commentText
        commentAuthor {
          username
        }
      }
    }
  }
`;
