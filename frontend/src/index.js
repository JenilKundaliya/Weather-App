import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import "./styles/navbar.scss";
import WeatherApp from "./components/WeatherApp";
import Navbar from "./components/Navbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="page-content d-flex flex-column">
    <Navbar />
    <WeatherApp />
  </div>
);
