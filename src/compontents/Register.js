import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";

export const Register = () => {
  return (
    <div className="login-page">
      <img
        alt="Logo"
        src={require("../images/Logo.png")}
        className="logo"
      ></img>
      <form className="login-container">
        <h1>Create Account</h1>

        <label for="username>">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          id="username"
        ></input>

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

        <label for="confirmPassword>">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          id="confirmPassword"
        ></input>

        <label for="address>">Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          name="address"
          id="address"
        ></input>

        <label for="profilePicture>">Profile picture</label>
        <input
          type="file"
          placeholder="Upload profile picture"
          name="profilePicture"
          id="profilePicture"
        ></input>

        <Button name="register">Register</Button>
      </form>
    </div>
  );
};
