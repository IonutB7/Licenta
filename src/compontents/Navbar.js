import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <ul>
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
          <Link to="/" className="logo">
            BidBay
          </Link>
          <div className="search">
            <input placeholder="Search item"></input>
            <Link to="/" className="navbar-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
          <Link to="/" className="navbar-balance">
            <span>300$</span>
          </Link>
          <Link to="/" className="navbar-mycart">
            <i className="fa-solid fa-cart-shopping" />
          </Link>
          <img
            src={require("../images/Untitled.png")}
            alt="profile icon"
            className="profilePicture"
          ></img>
          <div className="navbar-icon" onClick={handleClick}>
            <i
              className={click ? "fa-solid fa-bars" : "fa-solid fa-xmark-large"}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
