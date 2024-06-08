import React, { useState, useContext, useEffect } from "react";
import "./Filters.css";
import { filtersContext } from "./pages/Bid.js";

function Filters() {
  const [minPrice, maxPrice, minBid, maxBid, brandsArray] =
    useContext(filtersContext);
  const [electronice, setElectronice] = useState(true);
  const [autoturisme, setAutoturisme] = useState(true);
  const [bijuterii, setBijuterii] = useState(true);
  const [imobiliare, setImobiliare] = useState(true);

  const filterBrands = (brand, brandArray) => {
    const x = brandArray.indexOf(brand);
    delete brandArray[x];
  };

  const setValue = (dest, value) => {
    dest.key = value;
  };

  useEffect(() => {}, [electronice, autoturisme, bijuterii, imobiliare]);

  return (
    <>
      <form className="bidFilters">
        <label>Price</label>
        <div>
          <input
            type="number"
            placeholder="minPrice"
            onChange={(e) => setValue(minPrice, e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="maxPrice"
            onChange={(e) => setValue(maxPrice, e.target.value)}
          ></input>
        </div>
        <label>Last bid</label>
        <div>
          <input
            type="number"
            placeholder="min last bid"
            onChange={(e) => setValue(minBid, e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="max last bid"
            onChange={(e) => setValue(maxBid, e.target.value)}
          ></input>
        </div>
        <label for="categorie">Categorie</label>
        <ul id="categorie">
          <li>
            <input
              type="checkbox"
              value="Electronice"
              onChange={(e) => {
                setElectronice(!electronice);
                electronice
                  ? brandsArray.push(e.target.value)
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
                  ? brandsArray.push(e.target.value)
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
                  ? brandsArray.push(e.target.value)
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
                  ? brandsArray.push(e.target.value)
                  : filterBrands(e.target.value, brandsArray);
              }}
            />
            <label>Bijuterii</label>
          </li>
        </ul>
      </form>
    </>
  );
}

export default Filters;
