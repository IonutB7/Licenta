import React from "react";
import "./Item.css";

function Item() {
  return (
    <>
      <li className="item-card">
        <img
          alt="product"
          src={require("../images/iph15.png")}
          className="item-photo"
        ></img>
        <p>Iphone 15 Pink</p>

        <p id="last-bid-ammount">
          <label>Last bid:</label>300
        </p>
        <p>
          Buy for:<span>1500$</span>
        </p>
        <h3>00:05:47</h3>
        <button>buy now</button>
        <input placeholder="type ammount to bid"></input>
        <button>bid</button>
      </li>
    </>
  );
}
export default Item;
