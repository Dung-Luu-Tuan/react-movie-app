import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import MovieDetail from "./pages/MovieDetail";
import CastInfo from "./pages/CastInfo";
import Index from "./pages/Index";
import MovieViewer from "./pages/MovieViewer";

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
        <Route path="/" element={<Index />} />
        {["/search/:searchString"].map((path, index) => (
          <Route path={path} element={<App />} key={index} />
        ))}
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/cast/:castId" element={<CastInfo />} />
        <Route path="/view/:slug" element={<MovieViewer />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
