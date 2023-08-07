import React from "react";
import SideBar from "./SideBar";
import ProfileInfo from "../components/ProfileInfo.js";

const ProfilePage = () => {
  return (
      <div className="flex-row justify-center">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div className="col-12 col-md-8 mb-3">
          <ProfileInfo />
        </div>
      </div>
  );
};

export default ProfilePage;
