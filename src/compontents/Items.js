import React, { useEffect, useState } from "react";
import "./Items.css";
import { Item } from "./Item.js";
import { auth, db } from "./firebase.js";

import { doc, getDoc, collection, getDocs } from "firebase/firestore";

function Items() {
  const [items, setItems] = useState();
  const [userDetails, setUserDetails] = useState(null);

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
        {items && userDetails && (
          <div>
            <ul className="items-list">
              {items.map((doc) => {
                return <Item item={doc} userDetails={userDetails}></Item>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default Items;
