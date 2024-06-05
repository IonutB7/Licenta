import { React } from "react";
import "./Item.css";
import CountDown from "react-countdown";

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

export const Item = ({ item }) => {
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
        <button>buy now</button>
        <input placeholder="type ammount to bid"></input>
        <button>bid</button>
      </li>
    </>
  );
};
