import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const OrgLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const login = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/org/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log("Organization logging in...");
        setErrorMessage("");
        setLoggedIn(true);
        nav("/org/dashboard"); // or wherever you want to redirect after login
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        setErrorMessage(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ color: "black" }}>Welcome Organizations!</h1>
      <p style={{ color: "black" }}>
        Let’s connect you with talented developers. Sign in to manage your jobs and find your next hire!
      </p>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      <form onSubmit={login}>
        <div>
          <label htmlFor="email" style={{ color: "black" }}>Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", color: "black" }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="password" style={{ color: "black" }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "1.5rem",
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "orange",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sign In
        </button>
      </form>

      <p >
        <a href="/org/register" style={{ color: "Black" }}>
                  Don't have an account? Register Here!
        </a>
      </p>
    </div>
  );
};
