import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../App";
import MovieCastsComponent from "./MovieCastsComponent";
import MovieTrailer from "./MovieTrailer";
import Writer from "./Writers";
import Directors from "./Directors";
import ErrorImg from "../picture/error_img_cast.jpg";

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieCast, setMovieCast] = useState();
  // const [movieTrailer, setMovieTrailer] = useState();
  // const { selectedMovie } = props;
  const { movieId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((response) => setMovieInfo(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/casts?api_key=${API_KEY}`
      )
      .then((response) => setMovieCast(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <div
        className="background-section"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieInfo?.backdrop_path})`,
        }}
      ></div>
      {movieInfo ? (
        <>
          <div className="content-section">
            <img
              id="poster"
              src={
                movieInfo?.poster_path
                  ? "https://image.tmdb.org/t/p/original/" +
                    movieInfo?.poster_path
                  : ErrorImg
              }
              alt=""
            />
            <div className="infoColumn">
              <div id="movieName">{movieInfo?.original_title}</div>

              <div className="movieInfo">
                Director :<Directors directors={movieCast?.crew}></Directors>
              </div>

              <div className="movieInfo">
                Writers :<Writer writer={movieCast?.crew}></Writer>
              </div>

              <div className="movieInfo">
                Runtime : <span>{movieInfo?.runtime} minutes</span>
              </div>

              <div className="movieInfo">
                Release Date : <span>{movieInfo?.release_date}</span>
              </div>

              <div id="overview">{movieInfo?.overview}</div>

              <div className="movieInfo">CAST</div>
              <div className="castList">
                <MovieCastsComponent
                  movieCast={movieCast?.cast}
                ></MovieCastsComponent>
              </div>

              <div className="movieInfo">TRAILER </div>
              <MovieTrailer
                movieTrailer={movieInfo?.videos.results}
              ></MovieTrailer>
            </div>
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </React.Fragment>
  );
};
export default MovieInfoComponent;
