import React from "react";
import Filters from "../Filters.js";
import "./Bid.css";
import Items from "../Items.js";

export const filtersContext = React.createContext();

function Bid() {
  const minPrice = { key: null };
  const maxPrice = { key: null };
  const minBid = { key: null };
  const maxBid = { key: null };
  var brandsArray = [];

  return (
    <div className="bid-div">
      <filtersContext.Provider
        value={[minPrice, maxPrice, minBid, maxBid, brandsArray]}
      >
        <Filters />
      </filtersContext.Provider>
      <filtersContext.Provider
        value={[minPrice, maxPrice, minBid, maxBid, brandsArray]}
      >
        <Items />
      </filtersContext.Provider>
    </div>
  );
}
export default Bid;
