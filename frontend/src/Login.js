import React, { useState } from "react";
import "./Login.css";

function Login() {
  // ✅ STATE VARIABLES (THIS FIXES THE ERROR)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ FORM SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage("Data stored successfully ");
        setEmail("");
        setPassword("");
      } else {
        setMessage("Failed to store data ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend not reachable ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        {/* ✅ handleSubmit IS USED HERE */}
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
