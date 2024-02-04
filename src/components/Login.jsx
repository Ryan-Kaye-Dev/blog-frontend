import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth(); // Access the login function from useAuth hook

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = import.meta.env.VITE_API_ENTRY_POINT + "/login";
    const data = { username, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Handle authentication token
        const token = responseData.token;

        // Store the token securely, for example, in an HTTP-only cookie
        document.cookie = `yourTokenCookieName=${token}; path=/; secure; HttpOnly; SameSite=Strict`;

        console.log("Login successful. Token:", token);

        // Update the login state
        login();

        // Redirect to home page
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Login;
