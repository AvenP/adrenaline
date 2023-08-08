// // import React, { useState, useEffect } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";

// import WorkoutForm from "../components/WorkoutForm";
// import WorkoutList from "../components/WorkoutList";
// import ExerciseForm from "../components/ExerciseForm";
// import CategoryForm from "../components/CategoryForm";

// import { QUERY_USER, QUERY_ME } from "../utils/queries";

// import Auth from "../utils/auth";

// const Profile = () => {
//   const { username } = useParams();

//   const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
//     variables: { username: username },
//   });

//   const user = data?.me || data?.user || {};
//   console.log("user", user);

//   // navigate to personal profile page if username is yours
//   // if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
//   //   return <Navigate to="/me" />;
//   // }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row justify-center mb-3">
//         <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
//           Viewing {username ? `${user.username}'s` : "your"} profile.
//         </h2>
//         <div className="col-12 col-md-10 mb-5">
//           <WorkoutList
//             workouts={user.workouts}
//             title={`${user.username}'s Workouts...`}
//             showTitle={false}
//             showUsername={false}
//           />
//         </div>
//         {!username && (
//           <div
//             className="col-12 col-md-10 mb-3 p-3"
//             style={{ border: "1px dotted #1a1a1a" }}
//           >
//             <WorkoutForm />
//           </div>
//         )}
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: "1px dotted #1a1a1a" }}
//         >
//           <ExerciseForm />
//         </div>
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: "1px dotted #1a1a1a" }}
//         >
//           <CategoryForm />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
