import React, { useState } from "react";
import Filters from "../Filters.js";
import "./Bid.css";
import Items from "../Items.js";

export const filtersContext = React.createContext();

function Bid() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999999);
  const [minBid, setMinBid] = useState(1);
  const [maxBid, setMaxBid] = useState(999999999);
  const [brandsArray, setBrandsArray] = useState([]);
  const [myBids, setMyBids] = useState(false);

  return (
    <div className="bid-div">
      <filtersContext.Provider
        value={[
          setMinPrice,
          setMaxPrice,
          setMinBid,
          setMaxBid,
          brandsArray,
          setBrandsArray,
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
