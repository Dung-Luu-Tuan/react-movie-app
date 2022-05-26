import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";
import "./config/axios";

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
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

  const fetchData2 = async (year) => {
    const response = await axios.get(`/discover/movie?year=${year}`);
    updateMovieList(response.data.results);
  };

  const onTextChange2 = (event) => {
    clearTimeout(timeoutId);
    setYearQuery(event.target.value);
    const timeout = setTimeout(() => fetchData2(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <>
      <div className="header">
        <div className="appName">
          <img className="movieImg" src="/movie-icon.svg" alt="" />
          <span className="movieLogo">React Movie App</span>
        </div>
        <div class="search">
          <div id="searchBox">
            <img id="searchIcon" src="/search-icon.svg" alt="" />
            <input
              id="searchInput"
              placeholder="Search Movie..."
              value={searchQuery}
              onChange={onTextChange}
            />
          </div>
          <div class="searchYear">
            <select value={Number(yearQuery)} onChange={onTextChange2}>
              <option value="">- Tất cả -</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="-2012">Trước 2012</option>
            </select>
          </div>
        </div>
      </div>

      <div className="movieListContainer">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent key={index} movie={movie} />
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
