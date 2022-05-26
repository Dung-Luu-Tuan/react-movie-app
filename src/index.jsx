import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import MovieInfoComponent from "./components/MovieInfoComponent";
import CastDetails from "./components/CastDetails";
import MovieIndexComponent from "./components/MovieIndexComponent";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #06121e;
  }
  html {
    font-size: 16px;
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MovieIndexComponent />} />
        <Route path="/search" element={<App />} ></Route>
        <Route path="/movie/:movieId" element={<MovieInfoComponent />} />
        <Route path="/cast/:castId" element={<CastDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
