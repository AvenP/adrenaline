import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import WorkoutForm from "../components/WorkoutForm";
import WorkoutList from "../components/WorkoutList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username } = useParams();
  debugger;
  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });
  debugger;
  const user = data?.me || data?.user || {};
  debugger;
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {username ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <WorkoutList
            Workouts={user.Workouts}
            title={`${user.username}'s Workouts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!username && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <WorkoutForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

// import React from "react";
// import { useQuery } from "@apollo/client";

// const Profile = () => {
//   //const

//   return (
//     <div className="profile-container">
//       <div className="profile-welcome-container">
//         <div className="profile-picture"></div>
//         <h1>Welcome ${user}</h1>
//         <h2>Let's start working out!</h2>
//         <p>
//           Need inspiration? Visit our <a href="">feed</a> and view other users
//           workouts.
//         </p>
//       </div>
//       <div className="profile-selection-container">
//         <div className="categories-container"></div>
//         <div className="exercises-container"></div>
//       </div>
//       <div className="profile-workout-container"></div>
//       <div className="profile-actions-container"></div>
//     </div>
//   );
// };
