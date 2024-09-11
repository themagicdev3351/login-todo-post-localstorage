// src/Profile.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Welcome, {user.username}</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
      <div className="mt-4">
        <Link to="/todo" className="btn btn-primary">
          Go to Todo List
        </Link>
        <Link to="/api" className="btn btn-info">
          Go to API Posts
        </Link>
      </div>
    </div>
  );
}

export default Profile;
