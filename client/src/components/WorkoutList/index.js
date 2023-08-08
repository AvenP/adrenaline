import React from "react";
// import { Link } from "react-router-dom";

const WorkoutList = ({
  workouts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!workouts.length) {
    return <h3>No WORKOUTS Yet?? Nerd</h3>;
  }

  const createWorkoutText = (workout) => {
    let workoutText = "";
    for (const workoutExercise of workout.exercises) {
      // Create an exercise item with the selected exercise and rest time
      let exerciseItem = `${workoutExercise.exercise.exerciseName} - Rest Time: ${workoutExercise.restTime}`;

      // Append the rep duration to the exercise item if specified
      if (workoutExercise.repDuration && !workoutExercise.untilFailure) {
        exerciseItem += ` - Reps: ${workoutExercise.repDuration} -  Total Sets:: ${workoutExercise.totalSets} - Reps. Per Set: ${workoutExercise.repsPerSet}`;
      } else if (workoutExercise.untilFailure) {
        exerciseItem += " - Reps: Until Failure";
      }

      // Append a new line character to separate exercises
      workoutText += exerciseItem + "\n";
    }
    return workoutText;
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {workouts &&
        workouts.map((workout) => (
          <div key={workout._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <div className="text-light">
                  {workout.createdBy.username} - {workout.workoutName} <br />
                  <span style={{ fontSize: "1rem" }}>
                    {workout.createdBy.username} created these GAINZZZZ on{" "}
                    {workout.createdAt}
                  </span>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You had this sick pump on {workout.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{createWorkoutText(workout)}</p>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/workouts/${workout._id}`}
            >
              Join the discussion on these MAD GAINSZZZZZ.
            </Link> */}
          </div>
        ))}
    </div>
  );
};

export default WorkoutList;
