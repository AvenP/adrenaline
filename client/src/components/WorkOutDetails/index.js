import React from "react";
import { Link } from "react-router-dom";

const WorkOutDetails = ({ workouts, title, showTitle = true }) => {
  if (Object.keys(workouts).length === 0) {
    return <h3>No WORKOUTS Yet?? Nerd</h3>;
  }
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      <div className="card mb-3">
        <h4 className="card-header bg-primary text-light p-2 m-0">
          <Link className="text-light">
            {workouts.createdBy.username} <br />
            <span style={{ fontSize: "1rem" }}>
              had this thought on these GAINZZZZ{" "}
              {new Date(Number(workouts.createdAt)).toLocaleString()}
            </span>
          </Link>
        </h4>
        <div className="card-body bg-light p-2">
          <p>{workouts.workoutName}</p>
        </div>
        {!workouts?.exercises || workouts?.exercises.length === 0
          ? null
          : workouts?.exercises.map((item, i) => (
              <div className="card mb-3" key={i}>
                <h4 className="card-header bg-primary text-light p-2 m-0">
                  <span style={{ fontSize: "1rem" }}>
                    {!item?.exercise || !item?.exercise?.exerciseName
                      ? null
                      : item?.exercise?.exerciseName}
                  </span>
                </h4>
                <div className="card-body bg-light p-2">
                  <p>
                    Category:&nbsp;
                    {!item?.exercise ||
                    !item?.exercise?.category ||
                    !item?.exercise?.category?.categoryName
                      ? null
                      : item?.exercise?.category?.categoryName}
                  </p>
                  <p>
                    Rep Duration:&nbsp;
                    {!item?.repDuration ? null : item?.repDuration}
                  </p>
                  <p>
                    Rep Per Set:&nbsp;
                    {!item?.repsPerSet ? null : item?.repsPerSet}
                  </p>
                  <p>
                    Rest Time:&nbsp;
                    {!item?.restTime ? null : item?.restTime}
                  </p>
                  <p>
                    Total Sets:&nbsp;
                    {!item?.totalSets ? null : item?.totalSets}
                  </p>
                  <p>
                    Until Failure:&nbsp;
                    {!item?.untilFailure ? null : item?.untilFailure}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default WorkOutDetails;
