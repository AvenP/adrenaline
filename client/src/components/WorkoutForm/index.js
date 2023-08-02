import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_WORKOUT } from "../../utils/mutations";
import { QUERY_WORKOUTS, QUERY_ME, QUERY_EXERCISES } from "../../utils/queries";

import Auth from "../../utils/auth";

const WorkoutForm = () => {
  const [workoutText, setWorkoutText] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedRestTime, setSelectedRestTime] = useState("");
  const [repDuration, setRepDuration] = useState("");
  const [untilFailure, setUntilFailure] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);

  const [characterCount, setCharacterCount] = useState(0);

  const { data: exerciseData } = useQuery(QUERY_EXERCISES);
  const exercises = exerciseData?.exercises || [];

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create a new exercise item with the selected exercise and rest time
    let exerciseItem = `${selectedExercise} - Rest Time: ${selectedRestTime}`;

    // Append the rep duration to the exercise item if specified
    if (repDuration && !untilFailure) {
      exerciseItem += ` - Reps: ${repDuration}`;
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
    setSelectedExercise("");
    setSelectedRestTime("");
    setRepDuration("");
    setUntilFailure(false);
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
              <label htmlFor="exercise">Select an Exercise:</label>
              <select
                name="exercise"
                value={selectedExercise}
                className="form-input"
                onChange={(e) => setSelectedExercise(e.target.value)}
              >
                <option value="">Select an exercise</option>
                {exercises.map((exercise) => (
                  <option key={exercise._id} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
              </select>
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
                <label htmlFor="untilFailure">Until Failure:</label>
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
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Exercise
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
