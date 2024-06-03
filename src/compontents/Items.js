import React from "react";
import "./Items.css";
import { Item } from "./Item.js";

function Items() {
  return (
    <>
      <div className="items-container">
        <ul className="items-list">
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </ul>
      </div>
    </>
  );
}
export default Items;
