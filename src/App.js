import React from "react";
import "./App.css";
import { Login } from "./compontents/Login";
import Layout from "./compontents/Layout";
import { Register } from "./compontents/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./compontents/pages/Home";
import Bid from "./compontents/pages/Bid";
import Contact from "./compontents/pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/bid" Component={Bid} />
            <Route path="/contact" Component={Contact} />
          </Route>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
