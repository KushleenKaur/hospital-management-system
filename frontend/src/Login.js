import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Login({ setIsLoggedIn, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Normal Login
  const login = () => {
    axios.post("http://localhost:8080/api/login", {
  username,
  password
}).then((res) => {
  if (res.data) {
    setUser(res.data);   // 👈 THIS is key
    setIsLoggedIn(true);
localStorage.setItem("isLoggedIn", "true");  // 👈 ADD THIS
  } else {
    alert("Invalid Credentials");
  }
});
  };

  // 🔵 Google Login Handler
  const handleGoogleLogin = (response) => {
    console.log("Google Response:", response);

    // Direct login for now
    setIsLoggedIn(true);
  };

  // 🔵 Initialize Google Button
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleLogin
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",
          size: "large"
        }
      );
    }
  }, []);

  return (
    <div className="container">
      <h1 className="login-title">🔐 Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {/* Google Login Button */}
      <div style={{ marginTop: "15px" }}>
        <div id="googleBtn"></div>
      </div>
    </div>
  );
}

export default Login;