import React, { useState, useContext, useEffect } from "react";
import "./Filters.css";
import { filtersContext } from "./pages/Bid.js";
import { Button } from "./Button.js";

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
  const [vehicule, setVehicule] = useState(true);
  const [bijuterii, setBijuterii] = useState(true);
  const [imobiliare, setImobiliare] = useState(true);
  const [decoratiuni, setDecoratiuni] = useState(true);
  const [antichitati, setAntichitati] = useState(true);
  const [myBidsStyle, setMyBidsStyle] = useState(false);

  const [filtersButton, setFiltersButton] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const filterBrands = (brand, dest) => {
    const newBrandsArray = dest.filter((item) => item !== brand);
    setBrandsArray(newBrandsArray);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setFiltersButton(true);
    } else {
      setFiltersButton(false);
    }
  };

  window.addEventListener("resize", showButton);

  useEffect(() => {
    showButton();
  }, []);

  return (
    <>
      <form
        className={buttonStatus ? "bidFilters " : "bidFilters activeFilter"}
      >
        {filtersButton && (
          <div
            className="filterIconDiv"
            onClick={() => {
              setButtonStatus(!buttonStatus);
            }}
          >
            <span className="filterIcon">
              <i className="fa-solid fa-filter"></i>
            </span>
          </div>
        )}

        {(!filtersButton || (filtersButton && buttonStatus)) && (
          <div className="filterProperties">
            <label>Price</label>
            <div className="value">
              <input
                type="number"
                placeholder="min"
                onChange={(e) => {
                  setMinPrice(e.target.value * 1);
                }}
              ></input>
              <input
                type="number"
                placeholder="max"
                onChange={(e) =>
                  e.target.value !== ""
                    ? setMaxPrice(e.target.value * 1)
                    : setMaxPrice(999999999)
                }
              ></input>
            </div>
            <label>Last bid</label>
            <div className="value">
              <input
                type="number"
                placeholder="min"
                onChange={(e) =>
                  e.target.value !== ""
                    ? setMinBid(e.target.value * 1)
                    : setMinBid(1)
                }
              ></input>
              <input
                type="number"
                placeholder="max"
                onChange={(e) =>
                  e.target.value !== ""
                    ? setMaxBid(e.target.value * 1)
                    : setMaxBid(999999999)
                }
              ></input>
            </div>

            <label htmlFor="categorie">Category</label>
            <ul id="categorie" className="itemCategory">
              <li>
                <label
                  className={`custom-antichitati ${
                    !antichitati ? "checked" : ""
                  }`}
                >
                  <span className="checkmark"></span>
                  Antiques
                  <input
                    type="checkbox"
                    value="Antiques"
                    onChange={(e) => {
                      setAntichitati(!antichitati);
                      antichitati
                        ? setBrandsArray([...brandsArray, e.target.value])
                        : filterBrands(e.target.value, brandsArray);
                    }}
                    className="antichitati"
                  />
                </label>
              </li>

              <li>
                <label
                  className={`custom-bijuterii ${!bijuterii ? "checked" : ""}`}
                >
                  Jewellery
                  <input
                    type="checkbox"
                    value="Jewellery"
                    onChange={(e) => {
                      setBijuterii(!bijuterii);
                      bijuterii
                        ? setBrandsArray([...brandsArray, e.target.value])
                        : filterBrands(e.target.value, brandsArray);
                    }}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`custom-decoratiuni ${
                    !decoratiuni ? "checked" : ""
                  }`}
                >
                  Decorations
                  <input
                    type="checkbox"
                    value="Decorations"
                    onChange={(e) => {
                      setDecoratiuni(!decoratiuni);
                      decoratiuni
                        ? setBrandsArray([...brandsArray, e.target.value])
                        : filterBrands(e.target.value, brandsArray);
                    }}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`custom-electronice ${
                    !electronice ? "checked" : ""
                  }`}
                >
                  Electronics
                  <input
                    type="checkbox"
                    value="Electronics"
                    onChange={(e) => {
                      setElectronice(!electronice);
                      electronice
                        ? setBrandsArray([...brandsArray, e.target.value])
                        : filterBrands(e.target.value, brandsArray);
                    }}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`custom-imobiliare ${
                    !imobiliare ? "checked" : ""
                  }`}
                >
                  Estates
                  <input
                    type="checkbox"
                    value="Estates"
                    onChange={(e) => {
                      setImobiliare(!imobiliare);
                      imobiliare
                        ? setBrandsArray([...brandsArray, e.target.value])
                        : filterBrands(e.target.value, brandsArray);
                    }}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`custom-vehicule ${!vehicule ? "checked" : ""}`}
                >
                  Vehicles
                  <input
                    type="checkbox"
                    value="Vehicles"
                    onChange={(e) => {
                      setVehicule(!vehicule);
                      vehicule
                        ? setBrandsArray([...brandsArray, e.target.value])
                        : filterBrands(e.target.value, brandsArray);
                    }}
                  />
                </label>
              </li>
            </ul>

            <Button
              onClick={() => {
                setMyBids(!myBids);
                setMyBidsStyle(!myBidsStyle);
              }}
              btnClass={
                !myBidsStyle ? "  myBidsButton" : "  myBidsButton bidsActive"
              }
              btnStyle={"btn--typeTwo"}
            >
              <i
                className={
                  !myBidsStyle
                    ? "fa-solid fa-cart-shopping"
                    : "fa-solid fa-cart-shopping bidsActive"
                }
              />
              <span className={!myBidsStyle ? "myBids" : "myBids bidsActive"}>
                My bids
              </span>
            </Button>
          </div>
        )}
      </form>
    </>
  );
}

export default Filters;
