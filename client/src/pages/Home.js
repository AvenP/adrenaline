import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

import { QUERY_WORKOUTS } from "../utils/queries";
import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const workouts = data?.workouts || [];

  return (
    <div className="col-12 p-3 mb-3 bg-primary">
      <h3>How are you gonna GET THEM GAINZZZ?</h3>

      {Auth.loggedIn() ? (
        <main>
          <div className="flex-row justify-center">
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: "1px solid #1a1a1a" }}
            >
              <WorkoutForm />
            </div>

            <div className="col-12 col-md-8 mb-3">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <WorkoutList
                  workouts={workouts}
                  title="Some Feed for them GAINSSSZZZZ BRO BRO(s)..."
                />
              )}
            </div>
          </div>
        </main>
      ) : (
        <p>
          You need to be logged in to share your WORKOUTS BRO. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default Home;
