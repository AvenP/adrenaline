import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";

const AllWorkouts = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const workouts = data?.workouts || [];
  return (
    <div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px solid #1a1a1a" }}
        >
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
    </div>
  );
};

export default AllWorkouts;
