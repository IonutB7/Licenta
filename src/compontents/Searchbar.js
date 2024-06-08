import React from "react";
import "./Searchbar.css";
import { Link } from "react-router-dom";

export const Searchbar = ({ className, onChange }) => {
  return (
    <div className={`${className}`}>
      <input placeholder="Search item" name="item" onChange={onChange}></input>

      <i className="fa-solid fa-magnifying-glass search-icon"></i>
    </div>
  );
};
