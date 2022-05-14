import axios from "axios";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";
import "./config/axios";

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(`/search/movie?query=${searchString}`);
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
          <img className="movieImg" src="/movie-icon.svg" alt="" />
          <span className="movieLogo">React Movie App</span>
        </div>
        <div id="searchBox">
          <img id="searchIcon" src="/search-icon.svg" alt="" />
          <input
            id="searchInput"
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
            />
          ))
        ) : (
          <h3>No Movie Search</h3>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default App;
