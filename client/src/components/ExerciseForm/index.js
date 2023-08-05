import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_EXERCISE } from "../../utils/mutations";
import {
  QUERY_EXERCISES,
  QUERY_ME,
  QUERY_CATEGORIES,
} from "../../utils/queries";

import Auth from "../../utils/auth";

const ExerciseForm = () => {
  // const [exerciseText, setExerciseText] = useState("");
  // const [exerciseType, setExerciseType] = useState("");
  // const [targetArea, setTargetArea] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [category, setCategory] = useState("");

  // grab QUERY_CATEGORIES

  // const { categories } = state;

  // const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const [addExercise, { error }] = useMutation(ADD_EXERCISE, {
    update(cache, { data: { addExercise } }) {
      try {
        const { exercises } = cache.readQuery({ query: QUERY_EXERCISES });

        cache.writeQuery({
          query: QUERY_EXERCISES,
          data: { exercises: [addExercise, ...exercises] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, exercises: [...me.exercises, addExercise] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addExercise({
        variables: {
          exerciseName,
          description,
          category,
          exerciseAuthor: Auth.getProfile().data.username,
        },
      });

      setExerciseName("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "description" && value.length <= 500) {
      setDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>How are you gonna GET THEM GAINZZZ?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 500 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/500
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            {/* <div className="col-12 col-lg-3">
              <label htmlFor="exerciseName">Exercise Type:</label>
              <select
                name="exerciseName"
                value={exerciseName}
                className="form-input"
                onChange={(e) => setExerciseName(e.target.value)}
              >
                <option value="">Select an exercise type</option>
                <option value="strength training">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga</option>
                <option value="endurance">Endurance</option>
              </select>
            </div> */}

            <div className="col-12 col-lg-3">
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                value={category}
                className="form-input"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                <option value="Arms">Arms</option>
                <option value="Legs">Legs</option>
                <option value="Back">Back</option>
                <option value="Chest">Chest</option>
              </select>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="description"
                placeholder="Here's a new way to get gainzzz..."
                value={description}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Exercise
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
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

export default ExerciseForm;
