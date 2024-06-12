import React, { useEffect, useState, useContext } from "react";
import "./Items.css";
import { Item } from "./Item.js";
import { db } from "./firebase.js";
import { Searchbar } from "./Searchbar.js";
import { collection, onSnapshot } from "firebase/firestore";
import { filtersContext } from "./pages/Bid.js";
import { userContext } from "./Layout.js";

function Items() {
  const [items, setItems] = useState([]);
  const [userDetails, userID] = useContext(userContext);
  const [query, setQuery] = useState("");
  const [minPrice, maxPrice, minBid, maxBid, brandsArray, myBids] =
    useContext(filtersContext);

  function filterItems(
    itemPrice,
    itemBid,
    itemCategory,
    minPrice,
    maxPrice,
    minBid,
    maxBid,
    brandsArray
  ) {
    if (itemPrice < minPrice) return false;
    if (itemPrice > maxPrice) return false;
    if (itemBid < minBid) return false;
    if (itemBid > maxBid) return false;
    if (brandsArray.length === 0) return true;
    if (!brandsArray.includes(itemCategory)) return false;

    return true;
  }

  useEffect(() => {
    const fetchItems = onSnapshot(collection(db, "Items"), (snapshot) => {
      const itms = [];
      snapshot.forEach((doc) => {
        itms.push({ ...doc.data(), id: doc.id });
      });
      setItems(itms);
    });

    return () => fetchItems();
  }, []);

  return (
    <>
      <div className="items-container">
        {items && userDetails && (
          <div>
            <Searchbar
              className={"search"}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="items-list">
              {items.map((doc) => {
                if (!myBids || (myBids && doc.lastBidder === userID)) {
                  if (
                    filterItems(
                      doc.buyPrice,
                      doc.bid,
                      doc.category,
                      minPrice,
                      maxPrice,
                      minBid,
                      maxBid,
                      brandsArray
                    )
                  ) {
                    if (!query || (query && doc.name.includes(query)))
                      return (
                        <Item
                          item={doc}
                          userDetails={userDetails}
                          userID={userID}
                        ></Item>
                      );
                    else {
                      return null;
                    }
                  } else return null;
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default Items;
