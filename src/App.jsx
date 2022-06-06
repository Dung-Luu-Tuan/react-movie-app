import axios from "axios";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";
import "./config/axios";

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const [movieList, setMovieList] = useState();

<<<<<<< HEAD
  const fetchDataInput = async (searchString) => {
=======
  const fetchData_searchString = async (searchString) => {
>>>>>>> 5b3b5eaa68f712c099df47e56fd1d3c6732043b8
    const response = await axios.get(`/search/movie?query=${searchString}`);
    setMovieList(response.data.results);
    setYearQuery('');
  };

<<<<<<< HEAD
  const fetchDataYear = async (year) => {
    const response = await axios.get("/discover/movie?" + checkTypeYear(year));
    updateMovieList(response.data.results);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchDataInput(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  const onYearChange = (event) => {
    setYearQuery(event.target.value);
    fetchDataYear(event.target.value);
  };

  function checkTypeYear(year) {
    if (year === "1") {
      return `release_date.lte=${Number(2012)}`;
    } else if (year === "0") {
      return "";
    } else {
      return `primary_release_year=${year}`;
    }
  }

  const SearchYear = () => {
    let year = [];
    for (let i = 2022; i > 2011; i--) {
      year.push(i);
    }
    return (
      <div className="searchYear">
        <select
          className="select-year"
          value={Number(yearQuery)}
          onChange={onYearChange}
        >
          <option value="0">- Phim mới - </option>
          {year.map((item, index) => (
            <option value={Number(item)} key={index}>
              {item}
            </option>
          ))}
          ;<option value="1">Trước 2012</option>
        </select>
      </div>
    );
  };

  const Container = () => {
    return (
      <div className="movieListContainer">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent key={index} movie={movie} />
          ))
        ) : (
          <h3>No Movie Search</h3>
        )}
      </div>
    );
=======
  const onTextChange_searchString = (event) => {
    clearTimeout(timeoutId);
    setSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData_searchString(event.target.value), 500);
    setTimeoutId(timeout);
  };

  const fetchData_selectYear = async (year) => {
    const response = await axios.get(`/discover/movie?release_date.lte=${year}`);
    setMovieList(response.data.results);
    setSearchQuery('')
  };

  const onTextChange_selectYear = (event) => {
    clearTimeout(timeoutId);
    setYearQuery(event.target.value);
    const timeout = setTimeout(() => fetchData_selectYear(event.target.value), 500);
    setTimeoutId(timeout);
>>>>>>> 5b3b5eaa68f712c099df47e56fd1d3c6732043b8
  };

  return (
    <>
      <div className="header">
<<<<<<< HEAD
        <Link to="/" className="page-link">
          <div className="appName">
            <img className="movieImg" src="/movie-icon.svg" alt="" />
            <span className="movieLogo">React Movie App</span>
          </div>
        </Link>
=======
        <div className="appName">
          <img className="movieImg" src="/movie-icon.svg" alt="" />
          <span className="movieLogo">React Movie App</span>
        </div>
>>>>>>> 5b3b5eaa68f712c099df47e56fd1d3c6732043b8
        <div className="search">
          <div id="searchBox">
            <img id="searchIcon" src="/search-icon.svg" alt="" />
            <input
              id="searchInput"
              placeholder="Search Movie..."
              value={searchQuery}
              onChange={onTextChange_searchString}
            />
          </div>
<<<<<<< HEAD
          <SearchYear />
=======
          <div className="searchYear">
            <select value={Number(yearQuery)} onChange={onTextChange_selectYear}>
              <option value="">- Năm phát hành -</option>
              <option value="2022">Năm 2022</option>
              <option value="2021">Năm 2021</option>
              <option value="2020">Năm 2020</option>
              <option value="2019">Năm 2019</option>
              <option value="2018">Năm 2018</option>
              <option value="2017">Năm 2017</option>
              <option value="2016">Năm 2016</option>
              <option value="2015">Năm 2015</option>
              <option value="2014">Năm 2014</option>
              <option value="2013">Năm 2013</option>
              <option value="2012">Năm 2012</option>
              <option value="-2012">Trước 2012</option>
            </select>
          </div>
>>>>>>> 5b3b5eaa68f712c099df47e56fd1d3c6732043b8
        </div>
      </div>
      <Container />
      <Outlet />
    </>
  );
}

export default App;
