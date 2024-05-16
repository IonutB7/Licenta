import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button.js";
import { Searchbar } from "./Searchbar.js";

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(false);

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

          <Searchbar
            className={
              click
                ? "navbar-search navbar-element"
                : "navbar-search navbar-element active"
            }
          />

          <Link to="/" className="navbar-balance navbar-element">
            <i className="fa-regular fa-dollar-sign" />
            <span>300</span>
          </Link>
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
          <img
            src={require("../images/Untitled.png")}
            alt="profile icon"
            className="profilePicture navbar-element"
          ></img>
          {!button && (
            <div className="navbar-icon navbar-element" onClick={handleClick}>
              <i
                className={
                  click ? "fa-solid fa-bars" : "fa-solid fa-xmark-large"
                }
              />
            </div>
          )}
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
