import React from "react";
import "./Searchbar.css";
import { Link } from "react-router-dom";

export const Searchbar = ({ className }) => {
  return (
    <form className={`${className}`}>
      <input placeholder="Search item" name="item"></input>
      <Link to="/" className="search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Link>
    </form>
  );
};
