import React from "react";
import "./Item.css";

export const Item = ({ name, lastBid, buyAmmount, timer }) => {
  return (
    <>
      <li className="item-card">
        <img
          alt="product"
          src={require("../images/iph15.png")}
          className="item-photo"
        ></img>
        <p>{name}</p>

        <p id="last-bid-ammount">
          <label>Last bid:</label>
          {lastBid}
        </p>
        <p>
          Buy for:<span>{buyAmmount}$</span>
        </p>
        <h3>{timer}</h3>
        <button>buy now</button>
        <input placeholder="type ammount to bid"></input>
        <button>bid</button>
      </li>
    </>
  );
};
