import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseForm from '../components/ExerciseForm';

const AddContent = () => {
  return (
    <div>
      {/* Back to the home GYM BRO button */}
      <Link to="/" className="btn btn-primary mb-3">
        Back to the home GYM BRO
      </Link>

      {/* Render the ExerciseForm */}
      <ExerciseForm />
    </div>
  );
};

export default AddContent;
