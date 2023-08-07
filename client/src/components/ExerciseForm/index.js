import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_EXERCISE } from "../../utils/mutations";
import { QUERY_CATEGORIES } from "../../utils/queries";

import Auth from "../../utils/auth";

const ExerciseForm = () => {
  //const [characterCount, setCharacterCount] = useState(0);

  const [formData, setFormData] = useState({
    exerciseName: "",
    category: "",
    description: "",
  });

  const [characterCount, setCharacterCount] = useState(0);
  const [
    createExercise,
    { loading: createExerciseLoading, error: mutationErr },
  ] = useMutation(ADD_EXERCISE);
  const { loading: categoryLoading, data: categoriesData } =
    useQuery(QUERY_CATEGORIES);
  console.log("categoriesData", categoriesData);

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    createExercise({
      variables: {
        ...formData,
        exerciseAuthor: Auth.getProfile().data.username,
      },
    })
      .then((result) => {
        console.log("exercise created", result.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("exercise create err", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevformdata) => ({
      ...prevformdata,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>How are you gonna GET THEM GAINZZZ?</h3>

      {Auth.loggedIn() ? (
        <>
          {/* <p
            className={`m-0 ${
              characterCount === 500 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/500
          </p> */}
          <form
            className="exerciseForm flex-row justify-center justify-space-between-md"
            onSubmit={handleSubmit}
          >
            <div className="col-12 col-lg-12">
              <label htmlFor="category">Select a Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                className="form-input"
                onChange={handleChange}
              >
                <option value="">Select a Category</option>
                {categoriesData?.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-lg-12">
              <label htmlFor="exerciseName">Exercise Name: </label>
              <div className="flex-row">
                <input
                  type="text"
                  id="exerciseName"
                  name="exerciseName"
                  placeholder="Exercise Name"
                  className="form-input w-20"
                  value={formData.exerciseName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-lg-12">
              <label>Description: </label>
              <div className="flex-row">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Here's a new way to get gainzzz..."
                  className="form-input w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-lg-3 mt-2">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Create Exercise
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

export default ExerciseForm;
