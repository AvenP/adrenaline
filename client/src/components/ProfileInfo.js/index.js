import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_ME } from "../../utils/queries";

const ProfileInfo = () => {
  const { data } = useQuery(QUERY_ME);
  return (
    <div className="flex-row justify-center">
      <div className="col-12 col-md-12 mb-3">
        <h2>Profile Info</h2>
      </div>
      <div className="col-12 col-md-12 mb-3">
        <p>
          Username:{" "}
          {!data || !data?.me || Object.keys(data?.me).length === 0
            ? null
            : data?.me?.username}
        </p>
        <p>
          Email:{" "}
          {!data || !data?.me || Object.keys(data?.me).length === 0
            ? null
            : data?.me?.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
