import React from "react";
import { useQuery } from "@apollo/client";

const Profile = () => {
  //const

  return (
    <div className="profile-container">
      <div className="profile-welcome-container">
        <div className="profile-picture"></div>
        <h1>Welcome ${user}</h1>
        <h2>Let's start working out!</h2>
        <p>
          Need inspiration? Visit our <a href="">feed</a> and view other users
          workouts.
        </p>
      </div>
      <div className="profile-selection-container">
        <div className="categories-container"></div>
        <div className="exercises-container"></div>
      </div>
      <div className="profile-workout-container"></div>
      <div className="profile-actions-container"></div>
    </div>
  );
};
