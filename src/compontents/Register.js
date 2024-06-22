import React, { useRef } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { PicturesDb } from "./firebase.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export const Register = () => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const username = useRef();
  const address = useRef();
  const profilePicture = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      email.current.checkValidity() &&
      password.current.checkValidity() &&
      confirmPassword.current.checkValidity() &&
      username.current.checkValidity() &&
      address.current.checkValidity() &&
      profilePicture.current.checkValidity()
    ) {
      if (password.current.value === confirmPassword.current.value) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          const user = auth.currentUser;

          if (user) {
            const photo = ref(
              PicturesDb,
              `profilePictures/${user.uid}/profilePicture`
            );
            let profilePic = "";
            await uploadBytes(photo, profilePicture.current.files[0]);
            await getDownloadURL(photo).then((url) => {
              profilePic = url;
            });
            await setDoc(doc(db, "Users", user.uid), {
              email: user.email,
              username: username.current.value,
              address: address.current.value,
              profilePicture: profilePic,
              balance: 0,
            });
          }

          alert("User Registered Successfully!");
          window.location.href = "/login";
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
    } else {
      if (!email.current.checkValidity()) alert("Email format not correct!");
      else alert("All fields required");
    }
  };

  return (
    <div className="register-page">
      <div className="logo-container">
        <Link to="/" className="register-logo">
          <img
            alt="Logo"
            src={require("../images/logo-login.png")}
            className="logo"
          ></img>
        </Link>
      </div>
      <form className="register-container" onSubmit={handleRegister}>
        <h1>Create Account</h1>
        <div className="inputDiv">
          <label for="username>">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            ref={username}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label for="email>">E-mail</label>
          <input
            placeholder="Enter your email"
            type="email"
            ref={email}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label for="password>">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            ref={password}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label for="confirmPassword>">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            ref={confirmPassword}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label for="address>">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            ref={address}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label for="profilePicture>">Profile picture</label>
          <input
            type="file"
            placeholder="Upload profile picture"
            ref={profilePicture}
            required
          ></input>
        </div>
        <Button
          className="register"
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
