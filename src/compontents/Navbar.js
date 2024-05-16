import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

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
          <ul className="navbar-element">
            <li>
              <Link to="/" className="bid">
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
          <Link to="/" className="logo navbar-element">
            BidBay
          </Link>
          <form className="search navbar-element">
            <input placeholder="Search item" name="item"></input>
            <Link to="/" className="navbar-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </form>
          <Link to="/" className="navbar-balance navbar-element">
            <i className="fa-regular fa-dollar-sign" />
            <span>300</span>
          </Link>
          <Link to="/" className="navbar-mycart navbar-element">
            <i className="fa-solid fa-cart-shopping" />
            <span>My cart</span>
          </Link>
          <img
            src={require("../images/Untitled.png")}
            alt="profile icon"
            className="profilePicture navbar-element"
          ></img>
          <div className="navbar-icon navbar-element" onClick={handleClick}>
            <i
              className={click ? "fa-solid fa-bars" : "fa-solid fa-xmark-large"}
            />
          </div>
          {button && (
            <Button
              className="navbar-element"
              btnStyle="btn--typeOne"
              btnSize="btn--l"
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
