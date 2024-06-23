import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { Button } from "./Button";

export const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email for the link to reset your password");
        window.location.href = "/login";
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  return (
    <div className="forgotPassPage">
      <div>
        <Link to="/">
          <img
            alt="Logo"
            src={require("../images/logo-login.png")}
            className="logo"
          ></img>
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="forgotPassForm">
        <section className="forgotPasswordSection">
          <h1>Forgot password</h1>
          <input
            placeholder="Type your email"
            name="email"
            className="emailInput"
          ></input>
          <button className="rgstBtn">Reset password</button>
          <Button towards={"/login"}>Cancel</Button>
        </section>
      </form>
    </div>
  );
};
