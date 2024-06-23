import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { auth, db } from "./firebase.js";
import { doc, updateDoc } from "firebase/firestore";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { PicturesDb } from "./firebase.js";
import { userContext } from "./Layout.js";

const imgTypes = ["image/png", "image/jpg", "image/jpeg"];

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [moneyDeposit, setMoneyDeposit] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const newProfilePicture = useRef();
  const [home, setHome] = useState(true);
  const [bid, setBid] = useState(false);
  const [contact, setContact] = useState(false);
  const [faq, setFaq] = useState(false);

  const [userDetails, userID] = useContext(userContext);

  async function handleLogout() {
    try {
      await auth.signOut();
      alert("User signed out successfully!");
      window.location.href = "/";
    } catch (error) {
      alert("Error logging out:", error.message);
    }
  }
  const handleClick = () => {
    setClick(!click);
    setShowInfo(false);
    setShowAddBalance(false);
    setShowSettings(false);
  };
  const closeOpenDivs = () => {
    setClick(true);
    setShowInfo(false);
    setShowAddBalance(false);
    setShowSettings(false);
  };

  const handleActivePage = () => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const currentPage = segments.pop() || segments.pop();

    if (currentPage === "home") {
      setHome(true);
      setBid(false);
      setContact(false);
      setFaq(false);
    } else if (currentPage === "bid") {
      setHome(false);
      setBid(true);
      setContact(false);
      setFaq(false);
    } else if (currentPage === "contact") {
      setHome(false);
      setBid(false);
      setContact(true);
      setFaq(false);
    } else if (currentPage === "faq") {
      setHome(false);
      setBid(false);
      setContact(false);
      setFaq(true);
    }
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const addBalance = (money) => {
    try {
      if (money > 0) {
        const refUser = doc(db, "Users", userID);
        updateDoc(refUser, {
          balance: userDetails.balance + 0.97 * money,
        });
        return;
      } else alert("Introdu o suma valida");
    } catch (error) {
      alert(error);
    }
  };

  const updateUsername = (username) => {
    try {
      if (username !== "") {
        const refUser = doc(db, "Users", userID);
        updateDoc(refUser, {
          username: username,
        });
        setShowSettings(false);
        alert("Username changed successfully");
      } else {
        alert("Type a new username");
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateAddress = (address) => {
    try {
      if (address !== "") {
        const refUser = doc(db, "Users", userID);
        updateDoc(refUser, {
          address: address,
        });
        setShowSettings(false);
        alert("Address changed successfully");
      } else {
        alert("Type a new address");
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateProfilePicture = async () => {
    try {
      if (!imgTypes.includes(newProfilePicture.current.files[0]?.type)) {
        alert("Use a valid image format");
      } else {
        const photo = ref(
          PicturesDb,
          `profilePictures/${userID}/profilePicture`
        );
        let profilePic = "";
        await uploadBytes(photo, newProfilePicture.current.files[0]);
        await getDownloadURL(photo).then((url) => {
          profilePic = url;
        });

        const refUser = doc(db, "Users", userID);
        updateDoc(refUser, {
          profilePicture: profilePic,
        });
        setShowSettings(false);
        alert("Profile picture changed successfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  window.addEventListener("resize", showButton);
  useEffect(() => {
    handleActivePage();
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <ul
            className={
              click
                ? "navbar-element navbar-list"
                : "navbar-element navbar-list active"
            }
          >
            <li
              className={home ? "activepage" : ""}
              onClick={() => {
                handleActivePage();
                closeOpenDivs();
              }}
            >
              <Link to="/home" className="home" onClick={() => setClick(true)}>
                Home
              </Link>
            </li>
            <li
              className={bid ? "activepage" : ""}
              onClick={() => {
                handleActivePage();
                closeOpenDivs();
              }}
            >
              <Link to="/bid" className="bid" onClick={() => setClick(true)}>
                Bid
              </Link>
            </li>
            <li
              className={contact ? "activepage" : ""}
              onClick={() => {
                handleActivePage();
                closeOpenDivs();
              }}
            >
              <Link
                to="/contact"
                className="contact"
                onClick={() => setClick(true)}
              >
                Contact
              </Link>
            </li>
            <li
              className={faq ? "activepage" : ""}
              onClick={() => {
                handleActivePage();
                closeOpenDivs();
              }}
            >
              <Link to="/faq" className="faq" onClick={() => setClick(true)}>
                Help
              </Link>
            </li>
            <div className="activepage"></div>
          </ul>

          <div
            className="navbar-element"
            onClick={() => {
              handleActivePage();
              closeOpenDivs();
            }}
          >
            <Link to="/home" className=" navbar-logo">
              <img src={require("../images/logo-bidbay.png")} alt="Logo" />
            </Link>
          </div>

          {userDetails && (
            <div
              onClick={() => {
                setShowAddBalance(!showAddBalance);
                setShowInfo(false);
                setShowSettings(false);
                setClick(true);
              }}
              className="navbar-balance navbar-element"
            >
              <i className="fa-regular fa-dollar-sign" />
              <span>{userDetails.balance}</span>
            </div>
          )}

          {userDetails && (
            <img
              src={userDetails.profilePicture}
              alt="profile icon"
              className="profilePicture navbar-element"
              onClick={() => {
                setShowInfo(!showInfo);
                setShowAddBalance(false);
                setShowSettings(false);
                setClick(true);
              }}
            ></img>
          )}
          {!button && (
            <div className="navbar-icon navbar-element" onClick={handleClick}>
              <i className={click ? "fa-solid fa-bars" : "fa-solid fa-xmark"} />
            </div>
          )}

          {!userDetails && (
            <Button
              className="navbar-element loginBtn"
              btnStyle="btn--typeOne"
              btnSize="btn--l"
              towards="login"
            >
              Login
            </Button>
          )}
        </div>
      </nav>

      {showAddBalance && (
        <div className="addBalance">
          <input
            placeholder="Enter amount"
            onChange={(e) => {
              setMoneyDeposit(e.target.value * 1);
            }}
          ></input>
          <div className="groupAddBalance">
            <button
              onClick={() => {
                addBalance(moneyDeposit);
              }}
              className="addButton"
            >
              Add
            </button>

            <button
              onClick={() => {
                setShowAddBalance(false);
              }}
              className="cancelButton"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showInfo && (
        <div className="userInfo">
          <ul className="userInfoList">
            <li className="userInfoElement">{userDetails?.username}</li>
            <li
              onClick={() => {
                setShowSettings(true);
                setShowInfo(!showInfo);
              }}
              className="settingsInfoElement"
            >
              Settings
            </li>
            <li>
              <button onClick={handleLogout} className="logOutButton">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {showSettings && (
        <div className="settings">
          <div className="groupSettings">
            <input
              type="text"
              placeholder="New username"
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
            ></input>

            <button
              onClick={() => {
                updateUsername(newUsername);
              }}
              className="arrowButton"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="groupSettings">
            <input
              type="text"
              placeholder="New address"
              onChange={(e) => {
                setNewAddress(e.target.value);
              }}
            ></input>

            <button
              onClick={() => {
                updateAddress(newAddress);
              }}
              className="arrowButton"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <label>Profile picture</label>
          <div className="groupSettings">
            <input type="file" ref={newProfilePicture}></input>
            <button
              onClick={() => {
                updateProfilePicture();
              }}
              className="settingsFile"
            >
              Update
            </button>
          </div>
          <button
            onClick={() => {
              setShowSettings(!showSettings);
            }}
            className="closeButton"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
