import React from "react";
import "./App.css";
import Navbar from "./compontents/Navbar";
import { Login } from "./compontents/Login";
import { Register } from "./compontents/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./compontents/pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
  const Layout = ({ children }) => {
    const location = useLocation();
    const isHomepage =
      location.pathname === "/" || location.pathname === "/home";

    return (
      <>
        {isHomepage && <Navbar />}
        {children}
      </>
    );
  };
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" exact Component={Home} />
            <Route path="/home" exact Component={Home} />
          </Route>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}
export default App;
