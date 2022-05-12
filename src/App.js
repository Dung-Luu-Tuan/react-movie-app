import React from "react";
import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";

export const API_KEY = "1ffbb6c9f0d5b48932c257b5d05f2a8e";

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [timeoutId, setTimeoutId] = useState();
  const [movieList, setMovieList] = useState();
  const [selectedMovie, setSelectedMovie] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    );
    setMovieList(response.data.results);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    setSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    setTimeoutId(timeout);
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
            value={searchQuery || ""}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div className="movieListContainer">
        {movieList?.length ? (
          movieList?.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={setSelectedMovie}
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
