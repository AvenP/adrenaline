import React from "react";
import SideBar from "./SideBar";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EXERCISES } from "../utils/queries";
import ExerciseList from "../components/ExerciseList";

const AllExercises = () => {
  const { loading, data } = useQuery(QUERY_ALL_EXERCISES);
  const workouts = data?.exercises || [];
  return (
    <div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ExerciseList
              workouts={workouts}
              title="Some Feed for them GAINSSSZZZZ BRO BRO(s)..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllExercises;
