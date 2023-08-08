import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import CategoryForm from "../components/CategoryForm";

const AddCategory = () => {
  return (
    <div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>
        <div className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px solid #1a1a1a" }}>
          {/* Back to the home GYM BRO button */}
          <Link to="/" className="btn btn-primary mb-3">
            Back to the home GYM BRO
          </Link>

          {/* Render the ExerciseForm */}
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
