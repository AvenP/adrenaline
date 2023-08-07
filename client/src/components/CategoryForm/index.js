import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_CATEGORY } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CategoryForm = () => {
  const [formData, setFormData] = useState({ categoryName: "" });

  const [
    createCategory,
    { loading: createCategoryLoading, error: mutationErr },
  ] = useMutation(ADD_CATEGORY);
  console.log("HELLO");

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({
      variables: {
        ...formData,
      },
    })
      .then((result) => {
        console.log("category created", result.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("err creating category: ", err);
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
      <h3>Category Form</h3>
      {Auth.loggedIn() ? (
        <>
          <form
            className="categoryForm flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleSubmit}
          >
            <div className="col-12 col-lg-3">
              <label htmlFor="categoryName">Category Name: </label>
              <div className="flex-row">
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-lg-3 mt-2">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Create Category
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

export default CategoryForm;
