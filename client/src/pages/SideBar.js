import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const SideBar = () => {
  return (
    <div className="container">
      {Auth.loggedIn() ? (
        <div className="display-flex flex-column">
          <div>
            <Link className="btn btn-lg btn-success m-2" to="/AddContent">
              Add Exercises
            </Link>
          </div>
          <div>
            <Link className="btn btn-lg btn-success m-2" to="/AddCategory">
              Add Category
            </Link>
          </div>
          <div>
            <Link className="btn btn-lg btn-success m-2" to="/add-workouts">
              Add Workout
            </Link>
          </div>
          <div>
            <Link className="btn btn-lg btn-success m-2" to="/exercise">
              All Exercises
            </Link>
          </div>
          <div>
            <Link className="btn btn-lg btn-success m-2" to="/workouts">
              All Workout
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SideBar;
