import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const Header = () => {
  const { data } = useQuery(QUERY_ME);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">ADRENALINE</h1>
          </Link>
          <p className="m-0">It's time to Git Good!</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {!data || !data?.me || Object.keys(data?.me).length === 0
                  ? null
                  : data?.me?.username}
                's profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg btn-success m-2" to="/">
                Feed
              </Link>
              <Link className="btn btn-lg btn-success m-2" to="/Support">
                Support
              </Link>
              {/* <Link className="btn btn-lg btn-success m-2" to="/AddExercise">
                Add Content
              </Link> */}
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
