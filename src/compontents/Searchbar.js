import React from "react";
import "./Searchbar.css";

export const Searchbar = ({ className, onChange }) => {
  return (
    <div className={`${className}`}>
      <input placeholder="Search item" name="item" onChange={onChange}></input>

      <i className="fa-solid fa-magnifying-glass search-icon"></i>
    </div>
  );
};
