import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutList = ({
  workouts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!workouts.length) {
    return <h3>No WORKOUTS Yet?? Nerd</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {workouts &&
        workouts.map((workout) => (
          <div key={workout._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${workout.workoutAuthor}`}
                >
                  {workout.workoutAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on these GAINZZZZ {workout.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this sick pump on {workout.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{workout.workoutText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/workouts/${workout._id}`}
            >
              Join the discussion on these MAD GAINSZZZZZ.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default WorkoutList;
