const {gql} = require("apollo-server-express")
const typeDefs = gql `
    type Category {
        _id: ID
        categoryName: String
    }
    type Exercise {
        _id: ID
        exerciseName: String
        description: String
        category: Category
        comments: [Comment]
        reactions: [Reaction]
    }
    type User{
        _id: ID
        name: String
        nameUser: String
        email: String
        workouts: [Workout]
    }
    type Workout{
        _id: ID
        workoutName: String
        description: String
        comments: [Comment]
        reactions: [Reaction]
    }
    type Query{
        categories: [Category]
        exercises(category:ID,name:String): [Exercise] 
        exercise(_id:ID): Exercise
        user:User
        workout(_id:ID): Workout
        workouts(user:ID,name:String): [Workout] 
    }
    type Mutation{
        addUser(
            firstName: String!
            lastName: String!
            email: String!
            password: String!
          ): Auth
    }
    updateUser(
        firstName: String
        lastName: String
        email: String
        password: String
      ): User
    }
    login(email: String!, password: String!): Auth
  }
    addExercise():Exercise
    addCategory():Category
    addWorkout():Workout
    updateExercise():Exercise
    updateCategory():Category
    updateWorkout():Workout

`;

module.exports = typeDefs




