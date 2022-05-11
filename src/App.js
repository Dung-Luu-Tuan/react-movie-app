import React from "react";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, Link, Redirect, Outlet } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "1ffbb6c9f0d5b48932c257b5d05f2a8e";

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    );
    updateMovieList(response.data.results);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <>
      <div className="header">
        <div className="appName">
          <img className="movieImg" src="/movie-icon.svg" />
          <span className="movieLogo">React Movie App</span>
        </div>
        <div id="searchBox">
          <img id="searchIcon" src="/search-icon.svg" />
          <input id="searchInput"
            placeholder="Search Movie..."
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div className="movieListContainer">
              {movieList?.length ? (
                movieList.map((movie, index) => (
                  <MovieComponent
                    key={index}
                    movie={movie}
                    onMovieSelect={onMovieSelect}
                  />
                ))
              ) : (
                <h3>No Movie Search</h3>
              )}
            </div>
      <Outlet/>
      </>
  );
}

export default App;
