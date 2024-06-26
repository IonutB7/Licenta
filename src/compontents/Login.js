import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      window.location.href = "/home";
    } catch (error) {
      console.log(error.message);
      alert(error.message, { position: "bottom-center" });
    }
  };
  return (
    <div className="login-page">
      <Link to="/">
        <img
          alt="Logo"
          src={require("../images/logo-login.png")}
          className="logo"
        ></img>
      </Link>
      <form className="login-container" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label for="email>">E-mail</label>
        <input
          placeholder="Enter your email"
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label for="password>">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <a href="/forgotpassword" className="forgotPass">
          Forgot passowrd?
        </a>

        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>

        <span className="noaccount" for="register">
          Don't have an account?
        </span>
        <Button name="register" towards="/register">
          Register
        </Button>
      </form>
    </div>
  );
};
