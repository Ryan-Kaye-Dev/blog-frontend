import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // Access the isLoggedIn and logout function from useAuth hook

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    // Update the login state when logging out
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Blog</h2>
      <div className="buttonbar">
        {isLoggedIn ? (
          <>
            <button className="create-post-button">Create Post</button>
            <button className="logout-button" onClick={handleLogoutClick}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className="signup-button">Sign Up</button>
            <button className="login-button" onClick={handleLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
