import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_WORKOUT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import {
  QUERY_WORKOUTS,
  QUERY_ME,
  QUERY_EXERCISES,
  QUERY_CATEGORIES,
} from "../../utils/queries";

import Select from "react-select";

const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutText, setWorkoutText] = useState("");
  const [selectedExercise, setSelectedExercise] = useState({
    category: null,
    exercise: null,
  });
  const [workoutList, setWorkoutList] = useState([]);

  const [characterCount, setCharacterCount] = useState(0);
  const { data: exerciseData } = useQuery(QUERY_EXERCISES);
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = categoryData?.categories || [];
  const exercises = exerciseData?.exercises || [];
  const getExercises = (categoryId) =>
    exercises.filter((exercise) => exercise.category._id === categoryId) || [];

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    update(cache, { data: { addWorkout } }) {
      try {
        const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });

        cache.writeQuery({
          query: QUERY_WORKOUTS,
          data: { workouts: [addWorkout, ...workouts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, workouts: [...me.workouts, addWorkout] } },
      });
    },
  });

  const addExercise = () => {
    console.log(selectedExercise);
    const exerciseObj = exercises.find(
      (e) => e._id === selectedExercise.exercise.value
    );
    setWorkoutList([...workoutList, exerciseObj]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(workoutList);
    console.log("form submitted");
  };

  useEffect(() => {
    if (workoutText.length <= 500) {
      setCharacterCount(workoutText.length);
    }
  }, [workoutText]);

  return (
    <div>
      <h3>How are you gonna GET THEM GAINZZZ?</h3>

      {Auth.loggedIn() ? (
        <>
          <p className={`m-0 ${characterCount === 500 ? "text-danger" : ""}`}>
            Character Count: {characterCount}/500
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-3">
              <label htmlFor="workoutName">Workout Name:</label>
              <div className="flex-row">
                <input
                  type="text"
                  name="workoutName"
                  placeholder="Enter Workout Name"
                  value={workoutName}
                  className="form-input"
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-lg-12">
              <label htmlFor="category">Select a Category:</label>
              <Select
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.categoryName,
                }))}
                value={selectedExercise.category}
                onChange={(category) => {
                  setSelectedExercise({
                    category: category,
                    exercise: null,
                  });
                }}
              />
            </div>

            <div className="col-12 col-lg-12">
              <label htmlFor="exercise">Select an Exercise:</label>
              <Select
                options={getExercises(selectedExercise?.category?.value).map(
                  (exercise) => ({
                    value: exercise._id,
                    label: exercise.exerciseName,
                  })
                )}
                value={selectedExercise.exercise}
                isDisabled={!selectedExercise.category}
                onChange={(exercise) =>
                  setSelectedExercise({
                    ...selectedExercise,
                    exercise: exercise,
                  })
                }
              />
            </div>

            <div className="col-12 col-lg-3 mt-2">
              <button
                className="btn btn-primary btn-block py-3"
                type="button"
                disabled={!selectedExercise?.exercise}
                onClick={addExercise}
              >
                Add Exercise to workout
              </button>
            </div>

            <div className="col-12 mt-2 ">
              <h4>Workout List: </h4>
              <ol className="workoutList">
                {workoutList?.map((exercise, index) => (
                  <li key={index}>{exercise.exerciseName}</li>
                ))}
              </ol>
            </div>

            <div className="col-12 col-lg-3">
              <label>Description: </label>
              <div className="flex-row">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  // value={formData.description}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-lg-3 mt-2">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Submit Workout
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your WORKOUTS BRO. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WorkoutForm;
