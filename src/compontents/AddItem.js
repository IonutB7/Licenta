import React, { useContext, useRef, useState } from "react";
import "./AddItem.css";
import { Button } from "./Button";
import { Context } from "./Navbar";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { PicturesDb } from "./firebase.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db } from "./firebase";

function AddItem() {
  const [addItem, setAddItem, userID] = useContext(Context);
  const [error, setError] = useState("");

  const itemBuyPrice = useRef();
  const itemCategory = useRef();
  const itemDescription = useRef();
  const itemMinBid = useRef();
  const itemName = useRef();
  const itemPhoto = useRef();
  const itemTimer = useRef();

  const imgTypes = ["image/png", "image/jpg", "image/jpeg"];

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (
      itemBuyPrice.current.checkValidity() &&
      itemCategory.current.checkValidity() &&
      itemDescription.current.checkValidity() &&
      itemMinBid.current.checkValidity() &&
      itemName.current.checkValidity() &&
      itemPhoto.current.checkValidity() &&
      itemTimer.current.checkValidity()
    ) {
      if (!imgTypes.includes(itemPhoto.current.files[0].type)) {
        return setError("Use a valid image format");
      }

      let currentDate = new Date();
      let dueDate = currentDate.setMinutes(
        currentDate.getMinutes() + itemTimer.current.value * 1
      );

      let itemID = crypto.randomUUID();
      let imagine = "";
      const photo = ref(PicturesDb, `itemsPhotos/${itemID}`);
      await uploadBytes(photo, itemPhoto.current.files[0]);
      await getDownloadURL(photo).then((url) => {
        imagine = url;
      });

      await setDoc(doc(db, "Items", itemID), {
        createdAt: Timestamp.now(),
        sellerId: userID,
        buyPrice: itemBuyPrice.current.value * 1,
        category: itemCategory.current.value,
        description: itemDescription.current.value,
        bid: itemMinBid.current.value * 1,
        name: itemName.current.value,
        imgRef: imagine,
        duration: dueDate,
        itemID: itemID,
        lastBidder: "",
      });

      setAddItem(!addItem);
    } else {
      alert("All inputs required");
    }
  };

  return (
    <>
      <div className="add-item">
        <form className="add-new-item">
          <h1>Add item</h1>

          <label>Product name</label>
          <input type="text" required ref={itemName}></input>

          <label>Description</label>
          <input type="text" required ref={itemDescription}></input>

          <label>Category</label>
          <select required ref={itemCategory}>
            <option>Electronice</option>
            <option>Autoturisme</option>
            <option>Imobiliare</option>
            <option>Bijuterii</option>
          </select>

          <label>Buy ammount</label>
          <input type="number" required ref={itemBuyPrice}></input>

          <label>Start price</label>
          <input type="number" required ref={itemMinBid}></input>

          <label>Timer</label>
          <input type="number" required ref={itemTimer}></input>

          <label>Photo</label>
          <input type="file" required ref={itemPhoto}></input>
          {error && <div>{error}</div>}

          <Button onClick={submitForm}>Add Item</Button>
          <Button onClick={() => setAddItem(!addItem)}>Cancel</Button>
        </form>
      </div>
    </>
  );
}
export default AddItem;
