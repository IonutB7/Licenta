import React, { useEffect, useRef } from "react";
import "./Item.css";
import CountDown from "react-countdown";
import { auth, db } from "./firebase.js";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }
  return (
    <h3>
      Time left: {days}d {hours}h {minutes}m {seconds}s
    </h3>
  );
};

export const Item = ({ item, userDetails }) => {
  const bidValue = useRef();
  const currentUser = auth.currentUser;
  var ref = doc(db, `Items/${item.itemID}`);

  async function buyItem() {
    if (userDetails.balance >= item.buyPrice) {
      var refUser = doc(db, `Users/${currentUser.uid}`);
      alert(
        "Prdusul a fost cumparat cu succes de catre: " + userDetails.username
      );
      await updateDoc(refUser, {
        balance: userDetails.balance - item.buyPrice,
      });
      deleteDoc(ref);
    } else {
      alert("Nu ai suficienti bani pentru a cumpara produsul!");
    }
  }

  const handleDelete = () => {
    deleteDoc(ref);
  };

  async function handleBid() {
    let bid = bidValue.current.value * 1;
    if (userDetails.balance < bid) {
      alert("Nu aveti suficienti bani in balanta");
      return;
    }
    if (bid > item.startPrice) {
      updateDoc(ref, { startPrice: bid, lastBidder: currentUser.uid });
    } else {
      alert("Bid-ul trebuie sa fie mai mare decat cel precedent");
      return;
    }
  }

  async function handleEndBid() {
    if (item.lastBidder === "") {
      console.log("Nimeni nu a licitat pentru item");
      await deleteDoc(ref);
    } else {
      console.log(item.lastBidder + "A castigat licitatia");
      await deleteDoc(ref);
    }
  }
  useEffect(() => {}, []);

  return (
    <>
      <li className="item-card">
        <img alt="product" src={item.imgRef} className="item-photo"></img>
        <h2>{item.name}</h2>

        <p>Description: {item.description}</p>
        <p>Category: {item.category}</p>
        <p id="last-bid-ammount">
          <label>Last bid:</label>
          {item.startPrice}
        </p>
        <p>
          Buy for:<span>{item.buyPrice}$</span>
        </p>
        <CountDown
          date={item.duration}
          renderer={renderer}
          onComplete={handleEndBid}
        />
        <button onClick={buyItem}>buy now</button>
        <input
          type="number"
          placeholder="type ammount to bid"
          ref={bidValue}
        ></input>
        <button onClick={handleBid}>bid</button>
        {item.sellerId === currentUser.uid && (
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </li>
    </>
  );
};
