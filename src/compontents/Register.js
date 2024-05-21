import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            username: username,
            address: address,
            profilePicture: profilePicture,
            balance: 0,
          });
        }
        console.log("User Registered Successfully!");
        window.location.href = "/login";
        alert("User Registered Successfully!", {
          position: "top-center",
        });
      } catch (error) {
        console.log(error.message);
        alert(error.message, {
          position: "bottom-center",
        });
      }
    } else {
      alert("Passwords don't match!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="login-page">
      <Link to="/">
        <img
          alt="Logo"
          src={require("../images/Logo.png")}
          className="logo"
        ></img>
      </Link>
      <form className="login-container" onSubmit={handleRegister}>
        <h1>Create Account</h1>

        <label for="username>">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label for="email>">E-mail</label>
        <input
          placeholder="Enter your email"
          name="email"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <label for="password>">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>

        <label for="confirmPassword>">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>

        <label for="address>">Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          name="address"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label for="profilePicture>">Profile picture</label>
        <input
          type="file"
          placeholder="Upload profile picture"
          name="profilePicture"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.value)}
        ></input>

        <Button
          name="register"
          type="submit"
          towards="/login"
          onClick={handleRegister}
        >
          Register
        </Button>
      </form>
    </div>
  );
};
