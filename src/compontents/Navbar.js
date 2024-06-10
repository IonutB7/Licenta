import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { auth, db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AddItem from "./AddItem.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { PicturesDb } from "./firebase.js";

export const Context = React.createContext();

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [moneyDeposit, setMoneyDeposit] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState();

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

  const addBalance = (money) => {
    if (money > 0) {
      const refUser = doc(db, "Users", currentUser.uid);
      updateDoc(refUser, {
        balance: userDetails.balance + 0.97 * money,
      });
      return;
    } else alert("Introdu o suma valida");
  };

  const updateUsername = (username) => {
    if (username !== "") {
      const refUser = doc(db, "Users", currentUser.uid);
      updateDoc(refUser, {
        username: username,
      });
    } else {
      alert("Type a new username");
    }
  };

  const updateProfilePicture = async (profilePicture) => {
    const photo = ref(
      PicturesDb,
      `profilePictures/${currentUser.uid}/profilePicture`
    );
    let profilePic = "";
    await uploadBytes(photo, profilePicture);
    await getDownloadURL(photo).then((url) => {
      profilePic = url;
    });

    const refUser = doc(db, "Users", currentUser.uid);
    updateDoc(refUser, {
      profilePicture: profilePic,
    });
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
            <div
              onClick={() => setShowAddBalance(!showAddBalance)}
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
      <Context.Provider value={[addItem, setAddItem, currentUser]}>
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
            type="file"
            onChange={(e) => {
              setNewProfilePicture(e.target.files[0]);
            }}
          ></input>
          <button
            onClick={() => {
              updateProfilePicture(newProfilePicture);
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
