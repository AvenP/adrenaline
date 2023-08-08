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
  const [selectedRestTime, setSelectedRestTime] = useState("");
  const [workoutList, setWorkoutList] = useState([]);
  const [repDuration, setRepDuration] = useState("");
  const [totalSets, setTotalSets] = useState(0);
  const [repsPerSet, setRepsPerSet] = useState(0);
  const [untilFailure, setUntilFailure] = useState(false);
  const [exerciseArray, setExerciseArray] = useState([]);
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

  // const addExercise = () => {
  //   console.log(selectedExercise);
  //   const exerciseObj = exercises.find(
  //     (e) => e._id === selectedExercise.exercise.value
  //   );
  //   setWorkoutList([...workoutList, exerciseObj]);
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setExerciseArray((prev) => [
      ...prev,
      {
        exercise: selectedExercise,
        restTime: selectedRestTime,
        repDuration,
        untilFailure,
        repsPerSet,
        totalSets,
      },
    ]);
    // Create a new exercise item with the selected exercise and rest time
    let exerciseItem = `Rest Time: ${selectedRestTime}`;

    // Append the rep duration to the exercise item if specified
    if (repDuration && !untilFailure) {
      exerciseItem += ` - Reps: ${repDuration} -  Total Sets:: ${totalSets} - Reps. Per Set: ${repsPerSet}`;
    } else if (untilFailure) {
      exerciseItem += " - Reps: Until Failure";
    }

    // Append a new line character to separate exercises
    exerciseItem += "\n";

    // Update the workout list with the new exercise item
    setWorkoutList([...workoutList, exerciseItem]);

    // Update the workout text with the complete workout list
    setWorkoutText(workoutText + exerciseItem);
    // Clear the selected exercise, rest time, rep duration, and untilFailure
    setRepsPerSet("");
    setWorkoutName("");
    setTotalSets("");
    setSelectedExercise("");
    setSelectedRestTime("");
    setRepDuration("");
    setUntilFailure(false);
    console.log(workoutList);
    console.log("form submitted");
  };

  const handleWorkout = async (event) => {
    event.preventDefault();
    await addWorkout({
      variables: {
        workoutName,
        exercises: exerciseArray,
      },
    });
    setExerciseArray([]);
    setWorkoutName("");
    setWorkoutList([]);
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

            <div className="col-12 col-lg-3">
              <label htmlFor="restTime">Rest Time:</label>
              <select
                name="restTime"
                value={selectedRestTime}
                className="form-input"
                onChange={(e) => setSelectedRestTime(e.target.value)}
              >
                <option value="">Select rest time</option>
                <option value="1 minute">1 minute</option>
                <option value="5 minutes">5 minutes</option>
                <option value="10 minutes">10 minutes</option>
                <option value="until failure">Until Failure</option>
              </select>
            </div>

            <div className="col-12 col-lg-3">
              <label htmlFor="repDuration">Rep Duration:</label>
              <div className="flex-row">
                <input
                  type="number"
                  name="repDuration"
                  placeholder="Enter rep duration"
                  value={repDuration}
                  className="form-input"
                  onChange={(e) => {
                    setUntilFailure(false);
                    setRepDuration(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-4">
              <label htmlFor="category">Total Sets:</label>
              <br />
              <input
                className="form-input"
                type="number"
                placeholder="Total Sets"
                name="totalSets"
                value={totalSets}
                onChange={(e) => setTotalSets(e.target.value)}
              />
            </div>

            <div className="col-4">
              <label htmlFor="category">Reps. Per Set:</label>
              <br />
              <input
                className="form-input"
                type="number"
                placeholder="Reps. Per Set"
                name="repsPerSet"
                value={repsPerSet}
                onChange={(e) => setRepsPerSet(e.target.value)}
              />
            </div>

            <div className="col-4">
              <label htmlFor="untilFailure">Until Failure:&nbsp;</label>
              <input
                type="checkbox"
                name="untilFailure"
                checked={untilFailure}
                onChange={(e) => {
                  setUntilFailure(e.target.checked);
                  setRepDuration("");
                }}
              />
            </div>

            <div className="col-12 col-lg-3 mt-2">
              <button
                className="btn btn-primary btn-block py-3"
                type="button"
                disabled={!selectedExercise?.exercise}
                onClick={handleFormSubmit}
              >
                Add Exercise to workout
              </button>
            </div>

            <div className="col-12">
              <textarea
                name="workoutText"
                placeholder="Complete Workout List"
                value={workoutText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={(e) => setWorkoutText(e.target.value)}
              ></textarea>
            </div>

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

            <div className="col-12 col-lg-3">
              <button
                className="btn btn-primary btn-block py-3"
                onClick={handleWorkout}
              >
                Add Workout
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
