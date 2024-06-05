import React, { useRef } from "react";
import "./Item.css";
import CountDown from "react-countdown";
import { auth, db } from "./firebase.js";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }
  return (
    <div>
      Time left: {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
};

export const Item = ({ item, userDetails }) => {
  const bidValue = useRef();
  const currentUser = auth.currentUser;
  var ref = doc(db, `Items/${item.itemID}`);
  async function buyItem() {
    if (userDetails.balance >= item.buyPrice) {
      console.log("poti cumpara produsul");
    } else {
      console.log("Nu ai suficienti bani pentru a cumpara produsul!");
    }
  }

  const handleDelete = () => {
    deleteDoc(ref);
  };

  async function handleBid() {
    let bid = bidValue.current.value * 1;
    if (bid > item.startPrice) {
      updateDoc(ref, { startPrice: bid, lastBidder: currentUser.uid });
    } else {
    }
  }
  return (
    <>
      <li className="item-card">
        <img alt="product" src={item.imgRef} className="item-photo"></img>
        <p>{item.name}</p>

        <p>{item.description}</p>
        <p id="last-bid-ammount">
          <label>Last bid:</label>
          {item.startPrice}
        </p>
        <p>
          Buy for:<span>{item.buyPrice}$</span>
        </p>
        <CountDown date={item.duration} renderer={renderer} />
        <button onClick={buyItem}>buy now</button>
        <input
          type="number"
          placeholder="type ammount to bid"
          ref={bidValue}
        ></input>
        <button onClick={handleDelete}>delete</button>
      </li>
    </>
  );
};
