import React from "react";
import "./App.css";
import Navbar from "./compontents/Navbar";
import { Login } from "./compontents/Login";
import { Register } from "./compontents/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact />
        </Routes>
        <Register />
      </Router>
    </>
  );
}
export default App;
