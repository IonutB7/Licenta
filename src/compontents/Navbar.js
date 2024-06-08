import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";

import { auth, db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";
import AddItem from "./AddItem.js";
export const Context = React.createContext();

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        alert("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, [currentUser, userDetails]);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      alert("User signed out successfully!");
    } catch (error) {
      alert("Error logging out:", error.message);
    }
  }
  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className={click ? "navbar-element" : "navbar-element active"}>
            <li>
              <Link to="/home" className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/bid" className="bid">
                Bid
              </Link>
            </li>
            <li>
              <Link to="/" className="contact">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="faq">
                FAQ
              </Link>
            </li>
          </ul>
          <button
            className="additem navbar-element"
            onClick={() => setAddItem(true)}
          >
            Add item
          </button>
          <Link to="/" className="navbar-element navbar-logo">
            <img src={require("../images/Logo.png")} alt="Logo" />
          </Link>

          {userDetails && (
            <Link to="/" className="navbar-balance navbar-element">
              <i className="fa-regular fa-dollar-sign" />
              <span>{userDetails.balance}</span>
            </Link>
          )}
          {userDetails && (
            <Link
              to="/"
              className={
                click
                  ? "navbar-mycart navbar-element"
                  : "navbar-mycart navbar-element active"
              }
            >
              <i className="fa-solid fa-cart-shopping" />
              <span>My cart</span>
            </Link>
          )}
          {userDetails && (
            <img
              src={userDetails.profilePicture}
              alt="profile icon"
              className="profilePicture navbar-element"
              onClick={() => setShowInfo(!showInfo)}
            ></img>
          )}
          {!button && (
            <div className="navbar-icon navbar-element" onClick={handleClick}>
              <i className={click ? "fa-solid fa-bars" : "fa-solid fa-xmark"} />
            </div>
          )}

          {!userDetails && (
            <Button
              className="navbar-element"
              btnStyle="btn--typeOne"
              btnSize="btn--l"
              towards="login"
            >
              Login
            </Button>
          )}
        </div>

        {showInfo && (
          <div className="userInfo">
            <ul>
              <li>{userDetails.username}</li>
              <li>
                <a href="/">Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <Context.Provider value={[addItem, setAddItem, currentUser]}>
        {addItem && <AddItem />}
      </Context.Provider>
    </>
  );
}

export default Navbar;
