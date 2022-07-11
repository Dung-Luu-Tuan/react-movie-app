import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import MovieComponent from "./MovieComponent";
import "../config/axios";

const SearchYear = () => {
  let year = [];
  for (let i = 2022; i > 2011; i--) {
    year.push(i);
  }
  return year;
};

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
  const [movieList, setMovieList] = useState([]);

  const timeoutId = useRef();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/search/movie?query=${params.searchString}`)
      .then((response) => setMovieList(response.data.results));
    setSearchQuery(params.searchString);
  }, []);

  const fetchDataInput = async (searchString) => {
    if (searchString.trim().length > 0) {
      const response = await axios.get(`/search/movie?query=${searchString}`);
      setMovieList(response.data.results);
      setYearQuery("");
    }
  };

  const fetchDataYear = async (year) => {
    const response = await axios.get("/discover/movie?" + checkTypeYear(year));
    setMovieList(response.data.results);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    setSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchDataInput(event.target.value), 500);
    timeoutId.current = timeout;
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

  return (
    <>
      <div className="header">
        <Link to="/" className="page-link">
          <div className="appName">
            <img className="movieImg" src="/movie-icon.svg" alt="" />
            <span className="movieLogo">React Movie App</span>
          </div>
        </Link>
        <div className="search">
          <div className="searchBox">
            <img id="searchIcon" src="/search-icon.svg" alt="" />
            <input
              id="searchInput"
              placeholder="Search Movie..."
              value={searchQuery}
              onChange={onTextChange}
            />
          </div>
          <div className="searchYear">
            <select
              className="select-year"
              value={Number(yearQuery)}
              onChange={onYearChange}
            >
              <option value="0">- Phim mới - </option>
              {SearchYear().map((item, index) => (
                <option value={Number(item)} key={index}>
                  {item}
                </option>
              ))}
              ;<option value="1">Trước 2012</option>
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

export default Index;
