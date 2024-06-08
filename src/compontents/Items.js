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
  const [minPrice, maxPrice, minBid, maxBid, brandsArray] =
    useContext(filtersContext);

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

  return (
    <>
      <div className="items-container">
        <div>{minPrice.key}</div>
        <div>{maxPrice.key}</div>
        <div>{minBid.key}</div>
        <div>{maxBid.key}</div>
        <div>{brandsArray}</div>

        {items && userDetails && (
          <div>
            <Searchbar
              className={"search"}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="items-list">
              {items.map((doc) => {
                if (!query)
                  return <Item item={doc} userDetails={userDetails}></Item>;
                else {
                  if (doc.name.includes(query))
                    return <Item item={doc} userDetails={userDetails}></Item>;
                  else return null;
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
