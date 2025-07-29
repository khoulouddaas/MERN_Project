import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const DevLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const login = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/devs/login",
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
        console.log("Logging in...");
        setErrorMessage("");
        setLoggedIn(true);
        nav("/jobs");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
  <h1 style={{ color: "black" }}>Welcome Developers!</h1>
  <p style={{ color: "black" }}>
    See why so many out of bootcamp developers choose us to help them find
    a new career opportunity! Let's connect you to a job!
  </p>


      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

     <form onSubmit={login}>
  <div>
    <label htmlFor="email" style={{ color: "black" }}>Email Address:</label> {/* Added style here */}
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
    <label htmlFor="password" style={{ color: "black" }}>Password:</label> {/* Added style here */}
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

      <p>
       
        <a href="/devs/register" style={{ color: "Orange" }}>
           Don't have an account? Register Here!
        </a>
      </p>
    </div>
  );
};
