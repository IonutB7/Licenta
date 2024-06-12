import React, { useState, useContext } from "react";
import "./Filters.css";
import { filtersContext } from "./pages/Bid.js";

function Filters() {
  const [
    setMinPrice,
    setMaxPrice,
    setMinBid,
    setMaxBid,
    brandsArray,
    setBrandsArray,
    myBids,
    setMyBids,
  ] = useContext(filtersContext);
  const [electronice, setElectronice] = useState(true);
  const [autoturisme, setAutoturisme] = useState(true);
  const [bijuterii, setBijuterii] = useState(true);
  const [imobiliare, setImobiliare] = useState(true);

  const filterBrands = (brand, dest) => {
    const newBrandsArray = dest.filter((item) => item !== brand);
    setBrandsArray(newBrandsArray);
  };

  return (
    <>
      <form className="bidFilters">
        <label>Price</label>
        <div>
          <input
            type="number"
            placeholder="minPrice"
            onChange={(e) => {
              setMinPrice(e.target.value * 1);
            }}
          ></input>
          <input
            type="number"
            placeholder="maxPrice"
            onChange={(e) =>
              e.target.value !== ""
                ? setMaxPrice(e.target.value * 1)
                : setMaxPrice(999999999)
            }
          ></input>
        </div>
        <label>Last bid</label>
        <div>
          <input
            type="number"
            placeholder="min last bid"
            onChange={(e) =>
              e.target.value !== ""
                ? setMinBid(e.target.value * 1)
                : setMinBid(1)
            }
          ></input>
          <input
            type="number"
            placeholder="max last bid"
            onChange={(e) =>
              e.target.value !== ""
                ? setMaxBid(e.target.value * 1)
                : setMaxBid(999999999)
            }
          ></input>
        </div>
        <label htmlFor="categorie">Categorie</label>
        <ul id="categorie">
          <li>
            <input
              type="checkbox"
              value="Electronice"
              onChange={(e) => {
                setElectronice(!electronice);
                electronice
                  ? setBrandsArray([...brandsArray, e.target.value])
                  : filterBrands(e.target.value, brandsArray);
              }}
            />
            <label>Electronice</label>
          </li>
          <li>
            <input
              type="checkbox"
              value="Autoturisme"
              onChange={(e) => {
                setAutoturisme(!autoturisme);
                autoturisme
                  ? setBrandsArray([...brandsArray, e.target.value])
                  : filterBrands(e.target.value, brandsArray);
              }}
            />
            <label>Autoturisme</label>
          </li>
          <li>
            <input
              type="checkbox"
              value="Imobiliare"
              onChange={(e) => {
                setImobiliare(!imobiliare);
                imobiliare
                  ? setBrandsArray([...brandsArray, e.target.value])
                  : filterBrands(e.target.value, brandsArray);
              }}
            />
            <label>Imobiliare</label>
          </li>
          <li>
            <input
              type="checkbox"
              value="Bijuterii"
              onChange={(e) => {
                setBijuterii(!bijuterii);
                bijuterii
                  ? setBrandsArray([...brandsArray, e.target.value])
                  : filterBrands(e.target.value, brandsArray);
              }}
            />
            <label>Bijuterii</label>
          </li>
        </ul>

        <div
          onClick={() => {
            setMyBids(!myBids);
          }}
        >
          <i className="fa-solid fa-cart-shopping" />
          <span>My bids</span>
        </div>
      </form>
    </>
  );
}

export default Filters;
