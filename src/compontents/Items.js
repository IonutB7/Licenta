import React, { useEffect, useState, useContext } from "react";
import "./Items.css";
import { Item } from "./Item.js";
import { auth, db } from "./firebase.js";
import { Searchbar } from "./Searchbar.js";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { filtersContext } from "./pages/Bid.js";

function Items() {
  const [items, setItems] = useState();
  const [userDetails, setUserDetails] = useState(null);
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
    if (itemPrice < minPrice.key) return false;
    if (itemPrice > maxPrice.key) return false;
    if (itemBid < minBid.key) return false;
    if (itemBid > maxBid.key) return false;
    if (brandsArray.length === 0) return true;
    if (!brandsArray.includes(itemCategory)) return false;

    return true;
  }

  const fetchItemsData = async () => {
    const itemsDB = await getDocs(collection(db, "Items"));

    const itms = [];
    itemsDB.forEach((itm) => {
      itms.push({ ...itm.data(), id: itm.id });
    });

    setItems(itms);
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        alert("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchItemsData();
    fetchUserData();
  }, [items]);

  useEffect(() => {}, [minPrice, maxPrice, minBid, maxBid, brandsArray]);

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
                if (
                  !myBids ||
                  (myBids && doc.lastBidder === auth.currentUser.uid)
                ) {
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
                    if (!query)
                      return <Item item={doc} userDetails={userDetails}></Item>;
                    else {
                      if (doc.name.includes(query))
                        return (
                          <Item item={doc} userDetails={userDetails}></Item>
                        );
                      else return null;
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
