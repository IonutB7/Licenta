import React, { useEffect, useState } from "react";
import "./Items.css";
import { Item } from "./Item.js";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

function Items() {
  const [items, setItems] = useState();

  const fetchItemsData = async () => {
    const itemsDB = await getDocs(collection(db, "Items"));

    const itms = [];
    itemsDB.forEach((itm) => {
      itms.push({ ...itm.data(), id: itm.id });
    });

    setItems(itms);
  };

  useEffect(() => {
    fetchItemsData();
  }, []);
  return (
    <>
      <div className="items-container">
        {items && (
          <div>
            <ul className="items-list">
              {items.map((doc) => {
                return <Item item={doc}></Item>;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
export default Items;
