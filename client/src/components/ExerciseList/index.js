import React from "react";
import { Link } from "react-router-dom";

const ExerciseList = ({ workouts, title, showTitle = true }) => {
  if (!workouts.length) {
    return <h3>No WORKOUTS Yet?? Nerd</h3>;
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {workouts &&
        workouts.map((workout) => (
          <div className="card mb-3" key={workout?._id}>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <Link className="text-light">{workout?.exerciseName}</Link>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{workout?.category?.categoryName}</p>
              <p>{workout?.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExerciseList;
