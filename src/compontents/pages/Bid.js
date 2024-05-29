import React from "react";
import Filters from "../Filters.js";
import "./Bid.css";
import Items from "../Items.js";

function Bid() {
  return (
    <>
      <div className="bid-div">
        <Filters />
        <Items />
      </div>
    </>
  );
}
export default Bid;
