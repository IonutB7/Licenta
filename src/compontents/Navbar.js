import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { auth, db } from "./firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import AddItem from "./AddItem.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { PicturesDb } from "./firebase.js";
import { userContext } from "./Layout.js";

export const Context = React.createContext();
const imgTypes = ["image/png", "image/jpg", "image/jpeg"];

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [moneyDeposit, setMoneyDeposit] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const newProfilePicture = useRef();

  const [userDetails, userID] = useContext(userContext);

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

  const updateProfilePicture = async (profilePicture) => {
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
              <Link to="/contact" className="contact">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="faq">
                FAQ
              </Link>
            </li>
          </ul>

          {userDetails && (
            <button
              className="additem navbar-element"
              onClick={() => setAddItem(true)}
            >
              Add item
            </button>
          )}

          <Link to="/" className="navbar-element navbar-logo">
            <img src={require("../images/Logo.png")} alt="Logo" />
          </Link>

          {userDetails && (
            <div
              onClick={() => {
                setShowAddBalance(!showAddBalance);
                setShowInfo(false);
                setShowSettings(false);
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
              className="navbar-element"
              btnStyle="btn--typeOne"
              btnSize="btn--l"
              towards="login"
            >
              Login
            </Button>
          )}
        </div>

        {showAddBalance && (
          <div className="addBalance">
            <input
              placeholder="Enter amount"
              onChange={(e) => {
                setMoneyDeposit(e.target.value * 1);
              }}
            ></input>
            <button
              onClick={() => {
                addBalance(moneyDeposit);
              }}
            >
              Add balance
            </button>
            <button
              onClick={() => {
                setShowAddBalance(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {showInfo && (
          <div className="userInfo">
            <ul>
              <li>{userDetails.username}</li>
              <li
                onClick={() => {
                  setShowSettings(true);
                  setShowInfo(!showInfo);
                }}
              >
                Settings
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <Context.Provider value={[addItem, setAddItem, userID]}>
        {addItem && <AddItem />}
      </Context.Provider>

      {showSettings && (
        <div className="settings">
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
          >
            Change username
          </button>

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
          >
            Change address
          </button>

          <input type="file" ref={newProfilePicture}></input>
          <button
            onClick={() => {
              updateProfilePicture();
            }}
          >
            Update profile picture
          </button>
          <button
            onClick={() => {
              setShowSettings(!showSettings);
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
