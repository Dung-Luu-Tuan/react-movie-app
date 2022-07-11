import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL } from "../App";
import MovieCastsComponent from "./MovieCastsComponent";
import MovieTrailer from "./MovieTrailer";
import Writer from "./Writers";
import Directors from "./Directors";
import ErrorImg from "../picture/error_img_cast.jpg";
import Header from "./Header";

const MovieInfoComponent = () => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieCast, setMovieCast] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    axios
      .get(`/movie/${movieId}?&append_to_response=videos`)
      .then((response) => setMovieInfo(response.data));
  }, [movieId]);

  useEffect(() => {
    axios
      .get(`/movie/${movieId}/casts`)
      .then((response) => setMovieCast(response.data));
  }, [movieId]);

  return (
    <React.Fragment>
      <Header />
      <div
        className="backgroundSection"
        style={{
          backgroundImage: movieInfo?.backdrop_path
            ? `url(${IMAGE_URL}/${movieInfo?.backdrop_path})`
            : `url("https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
        }}
      ></div>
      {movieInfo ? (
        <>
          <div className="contentSection">
            <img
              id="poster"
              src={
                movieInfo?.poster_path
                  ? IMAGE_URL + movieInfo?.poster_path
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

              <div className="overview">{movieInfo?.overview}</div>

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
