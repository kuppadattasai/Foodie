import React, { useState } from "react";
import { API_PATH } from "../../helpers/ApiPath";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_PATH}vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor Registered");
        showLoginHandler();
      }
    } catch (error) {
      console.log(error);
      alert("registration failed");
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your Name"
        />
        <br />
        <label>Email</label>
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Enter your Email"
        />
        <br />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter your Password"
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
