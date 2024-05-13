import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            BidBay
          </Link>
          <ul>
            <li>Bid</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
          <input placeholder="Search item"></input>
          <i>Search</i>

          <span>300$</span>
          <i>My cart</i>
          <img src="" alt="profile icon"></img>
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
