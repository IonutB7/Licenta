import React, { useEffect, useRef } from "react";
import "./Item.css";
import CountDown from "react-countdown";
import { db } from "./firebase.js";
import { PicturesDb } from "./firebase.js";
import { doc, deleteDoc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return null;
  }
  return (
    <>
      <h3>Time left:</h3>
      <h3>
        {days}d {hours}h {minutes}m {seconds}s
      </h3>
    </>
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

        var refUserDb = doc(db, `Users/${item.sellerId}`);
        const docSnapUser = await getDoc(refUserDb);
        await updateDoc(refUserDb, {
          balance: docSnapUser.data().balance + item.buyPrice * 1,
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

      var refUserDb = doc(db, `Users/${item.sellerId}`);
      const docSnapUser = await getDoc(refUserDb);
      await updateDoc(refUserDb, {
        balance: docSnapUser.data().balance + item.bid * 1,
      });

      await deleteDoc(refDb);
      await deleteObject(photoRef);
    }
  }
  useEffect(() => {}, []);

  return (
    <>
      <li className="item-card">
        <div className="imgContainer">
          <img alt="product" src={item.imgRef} className="item-photo"></img>
        </div>
        <div className="halfDiv">
          <h2>{item.name}</h2>

          <div className="itemAllDetails">
            <p className="category">{item.category}</p>
            <p className="description">{item.description}</p>
            <p id="last-bid-ammount">
              <label>Last bid:</label>
              <span
                style={
                  item.lastBidder !== ""
                    ? item.lastBidder === userID
                      ? { color: "green" }
                      : { color: "red" }
                    : {}
                }
              >
                {item.bid}
              </span>
            </p>

            <p>
              Buy for:<span>{item.buyPrice}$</span>
            </p>
          </div>
          <CountDown
            date={item.duration}
            renderer={renderer}
            onComplete={handleEndBid}
          />
        </div>
        <div className="buttons">
          {item.sellerId !== userID && (
            <>
              <button onClick={buyItem}>Buy</button>
              <input
                type="number"
                placeholder="Bid value"
                ref={bidValue}
              ></input>
              <button onClick={handleBid}>Bid</button>
            </>
          )}
          {item.sellerId === userID && (
            <div>
              <button onClick={handleDelete} className="deleteBtn">
                Delete
              </button>
            </div>
          )}
        </div>
      </li>
    </>
  );
};
