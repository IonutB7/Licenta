import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";

export const Login = () => {
  return (
    <div className="login-page">
      <img
        alt="Logo"
        src={require("../images/Logo.png")}
        className="logo"
      ></img>
      <form className="login-container">
        <h1>Login</h1>
        <label for="email>">E-mail</label>
        <input
          placeholder="Enter your email"
          name="email"
          type="email"
          id="email"
        ></input>

        <label for="password>">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
        ></input>

        <a href="forgotPassword" className="forgotPass">
          Forgot passowrd?
        </a>

        <Button>Login</Button>

        <span for="register">Don't have an account?</span>
        <Button name="register">Register</Button>
      </form>
    </div>
  );
};
