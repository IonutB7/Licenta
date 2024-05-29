import React from "react";
import "./Filters.css";

function Filters() {
  return (
    <>
      <form className="bidFilters">
        <input type="range"></input>
        <label for="categorie">Categorie</label>
        <ul id="categorie">
          <li>
            <input type="checkbox" />
            <label>Electronice</label>
          </li>
          <li>
            <input type="checkbox" />
            <label>Autoturisme</label>
          </li>
          <li>
            <input type="checkbox" />
            <label>Imobiliare</label>
          </li>
          <li>
            <input type="checkbox" />
            <label>Bijuterii</label>
          </li>
        </ul>
      </form>
    </>
  );
}

export default Filters;
