import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Back to the home GYM BRO
          </button>
        )}
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            🥩
          </span>{' '}
          by the ADRENALINE team.
        </h4>
        <nav>
          <h4>
            Contact Us
          </h4>
        <a href="mailto:Philippwinston@gmail.com">Email us if you NEED HELP WITH GAINSSSZZZZ</a>

      </nav>
      </div>
    </footer>
  );
};

export default Footer;
