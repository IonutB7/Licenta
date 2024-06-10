import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { Button } from "./Button";

export const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(auth, email)
      .then((data) => {
        alert("Check your email for the link to resset your password");
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  return (
    <div>
      <Link to="/">
        <img
          alt="Logo"
          src={require("../images/Logo.png")}
          className="logo"
        ></img>
      </Link>

      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Forgot password</h1>
        <input placeholder="Type your email" name="email"></input>
        <button>Reset password</button>
        <Button towards={"/login"}>Cancel</Button>
      </form>
    </div>
  );
};
