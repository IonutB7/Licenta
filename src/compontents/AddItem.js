import React, { useContext } from "react";
import "./AddItem.css";
import { Button } from "./Button";
import { Context } from "./Navbar";

function AddItem() {
  const [addItem, setAddItem] = useContext(Context);
  return (
    <>
      <div className="add-item">
        <form className="add-new-item">
          <i
            className="fa-solid fa-xmark"
            onClick={() => setAddItem(!addItem)}
          />
          <h1>Add item</h1>

          <label for="username>">Product name</label>
          <input></input>

          <label for="confirmPassword>">Description</label>
          <input></input>

          <label for="confirmPassword>">Category</label>
          <input></input>

          <label for="email>">Buy ammount</label>
          <input></input>

          <label for="password>">Min bid</label>
          <input></input>

          <label for="confirmPassword>">Description</label>
          <input></input>

          <label for="address>">Timer</label>
          <input></input>

          <label for="profilePicture>">Photo</label>
          <input></input>

          <Button>Add Item</Button>
        </form>
      </div>
    </>
  );
}
export default AddItem;
