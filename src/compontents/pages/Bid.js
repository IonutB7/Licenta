import React, { useState } from "react";
import Filters from "../Filters.js";
import "./Bid.css";
import Items from "../Items.js";

export const filtersContext = React.createContext();

function Bid() {
  const minPrice = { key: 0 };
  const maxPrice = { key: 999999999 };
  const minBid = { key: 1 };
  const maxBid = { key: 999999999 };
  var brandsArray = [];
  const [myBids, setMyBids] = useState(false);

  return (
    <div className="bid-div">
      <filtersContext.Provider
        value={[
          minPrice,
          maxPrice,
          minBid,
          maxBid,
          brandsArray,
          myBids,
          setMyBids,
        ]}
      >
        <Filters />
      </filtersContext.Provider>
      <filtersContext.Provider
        value={[minPrice, maxPrice, minBid, maxBid, brandsArray, myBids]}
      >
        <Items />
      </filtersContext.Provider>
    </div>
  );
}
export default Bid;
