import React, { useEffect, useRef } from "react";
import "./Item.css";
import CountDown from "react-countdown";
import { db } from "./firebase.js";
import { PicturesDb } from "./firebase.js";
import { doc, deleteDoc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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

export const Item = ({ item, userDetails, userID }) => {
  const bidValue = useRef();
  var refDb = doc(db, `Items/${item.itemID}`);
  const photoRef = ref(PicturesDb, `itemsPhotos/${item.itemID}`);

  async function buyItem() {
    if (item.bid <= item.buyPrice) {
      if (userDetails.balance >= item.buyPrice) {
        var refUser = doc(db, `Users/${userID}`);

        await setDoc(doc(db, "Sold Items", item.itemID), {
          name: item.name,
          boughtBy: userID,
          soldBy: item.sellerId,
          soldFor: item.buyPrice,
          deliveryAddress: userDetails.address,
        });
        await updateDoc(refUser, {
          balance: userDetails.balance - item.buyPrice,
        });

        deleteDoc(refDb);
        await deleteObject(photoRef);
        console.log(
          "Produsul a fost cumparat cu succes de catre: " + userDetails.username
        );
      } else {
        alert("Nu ai suficienti bani pentru a cumpara produsul!");
      }
    } else {
      alert("Bid-ul a depasit valoarea produsului si nu mai poate fi cumparat");
    }
  }

  const handleDelete = async () => {
    await deleteDoc(refDb);
    await deleteObject(photoRef);
  };

  async function handleBid() {
    let bid = bidValue.current.value * 1;
    if (userDetails.balance < bid) {
      alert("Nu aveti suficienti bani in balanta");
      return;
    }
    if (bid > item.bid) {
      await updateDoc(refDb, { bid: bid, lastBidder: userID });
    } else {
      alert("Bid-ul trebuie sa fie mai mare decat cel precedent");
      return;
    }
  }

  async function handleEndBid() {
    if (item.lastBidder === "") {
      console.log("Nimeni nu a licitat pentru item");
      await deleteDoc(refDb);
      await deleteObject(photoRef);
    } else {
      const refUser = doc(db, `Users/${item.lastBidder}`);
      const docSnap = await getDoc(refUser);
      console.log(item.lastBidder + "A castigat licitatia");
      console.log(docSnap.data().balance);
      await setDoc(doc(db, "Sold Items", item.itemID), {
        name: item.name,
        boughtBy: item.lastBidder,
        soldBy: item.sellerId,
        soldFor: item.bid,
        deliveryAddress: docSnap.data().address,
      });
      await updateDoc(refUser, {
        balance: docSnap.data().balance - item.bid * 1,
      });

      await deleteDoc(refDb);
      await deleteObject(photoRef);
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
          {item.bid}
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
        {item.sellerId === userID && (
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </li>
    </>
  );
};
