import React, { useContext, useRef, useState } from "react";
import "./AddItem.css";
import { Button } from "./Button";
import { Context } from "./Items";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { PicturesDb } from "./firebase.js";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

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
        return alert("Use a valid image format");
      }
      if (itemBuyPrice.current.value * 1 < itemMinBid.current.value * 1) {
        return alert("Start price must be lower than Buy price");
      }

      let currentDate = new Date();
      let dueDate = currentDate.setMinutes(
        currentDate.getMinutes() + itemTimer.current.value * 1
      );

      let itemID = uuidv4();
      let image = "";
      const photo = ref(PicturesDb, `itemsPhotos/${itemID}`);
      await uploadBytes(photo, itemPhoto.current.files[0]);
      await getDownloadURL(photo).then((url) => {
        image = url;
      });

      await setDoc(doc(db, "Items", itemID), {
        createdAt: Timestamp.now(),
        sellerId: userID,
        buyPrice: itemBuyPrice.current.value * 1,
        category: itemCategory.current.value,
        description: itemDescription.current.value,
        bid: itemMinBid.current.value * 1,
        name: itemName.current.value,
        imgRef: image,
        duration: dueDate,
        itemID: itemID,
        lastBidder: "",
        bidders: "",
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
          <h1>Add Item</h1>

          <label>Product name</label>
          <input type="text" required ref={itemName}></input>

          <label>Description</label>
          <textarea
            type="text"
            required
            ref={itemDescription}
            className="descriptionArea"
          ></textarea>

          <label>Category</label>
          <select required ref={itemCategory}>
            <option>Antiques</option>
            <option>Jewellery</option>
            <option>Decorations</option>
            <option>Electronics</option>
            <option>Estates</option>
            <option>Vehicles</option>
          </select>

          <label>Buy price</label>
          <input type="number" required ref={itemBuyPrice}></input>

          <label>Start price</label>
          <input type="number" required ref={itemMinBid}></input>

          <label>Timer</label>
          <input type="number" required ref={itemTimer}></input>

          <label>Photo</label>
          <input
            type="file"
            required
            ref={itemPhoto}
            className="photoSelect"
          ></input>
          {error && <div>{error}</div>}

          <Button onClick={submitForm} btnStyle={"btn--typeThree"}>
            Add Item
          </Button>
          <Button
            onClick={() => setAddItem(!addItem)}
            btnStyle={"btn--typeFour"}
          >
            Cancel
          </Button>
        </form>
      </div>
    </>
  );
}
export default AddItem;
