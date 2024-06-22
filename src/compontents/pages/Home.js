import React from "react";
import "../Home.css";

function Home() {
  return (
    <>
      <div className="homepage">
        <section className="slice">
          <h1>WELCOME TO BIDBAY</h1>
        </section>
        <img
          alt="house"
          className="house"
          src={require("../../images/house.png")}
        ></img>

        <div className="whoAreWe">
          <h2>Who are we?</h2>
          <p>
            Bidbay is a website where you can buy, sell or auction items. It is
            an open market so anyone can upload their products with a single
            click. This website was created for anyone, so whether you are a
            small comerciant, artist, a big seller, or just a person who wants
            to put their items to auction, this website is for you.
          </p>
          <img
            alt="audi"
            className="audi"
            src={require("../../images/audi_upscaled.png")}
          ></img>
        </div>

        <div className="whyUs">
          <p>
            <i class="fa-solid fa-shield-halved"></i>Trust and security
          </p>
          <p>
            <i class="fa-solid fa-lightbulb"></i>Ease of use
          </p>
          <p>
            <i class="fa-solid fa-truck-fast"></i>Quick sales
          </p>
          <p>
            <i class="fa-solid fa-people-group"></i>Large audience
          </p>
          <p>
            <i class="fa-solid fa-boxes-stacked"></i>Wide variety
          </p>
          <p>
            <i class="fa-solid fa-gem"></i>Rare Items
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
