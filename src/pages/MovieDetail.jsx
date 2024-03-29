import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { IMAGE_URL } from "../App";
import Casts from "../components/Casts";
import Trailers from "../components/Trailers";
import Writers from "../components/Writers";
import Directors from "../components/Directors";
import ErrorImg from "../picture/error_img_cast.jpg";
import Header from "../components/Header";
import { getVideo } from "../config/axios";
import { FaPlay } from "react-icons/fa6";

const MovieInfoComponent = () => {
  const [movieInfo, setMovieInfo] = useState();
  const [movieCast, setMovieCast] = useState();
  const [slug, setSlug] = useState();
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

  useEffect(() => {
    getVideo(`/v1/api/tim-kiem?keyword=${movieInfo?.original_title}`)
      .then(res => {
        if (!res) return;
        const resultSearch = res?.data?.data?.items;
        if (resultSearch.length > 0) {
          const result = resultSearch.filter(item => item.origin_name === movieInfo?.original_title)
          if (result.length > 0) {
            setSlug(result[0].slug)
          }
        }
      })
  }, [movieInfo])

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
            <div className="posterContainer">
              <img
                id="poster"
                src={
                  movieInfo?.poster_path
                    ? IMAGE_URL + movieInfo?.poster_path
                    : ErrorImg
                }
                alt=""
              />
              {slug &&
                (
                  <Link to={`/view/${slug}`} className="page-link">
                    <button className="buttonView" ><FaPlay />Xem phim</button>
                  </Link>
                )
              }
            </div>
            <div className="infoColumn">
              <div id="movieName">{movieInfo?.original_title}</div>

              <div className="movieInfo">
                Director :<Directors directors={movieCast?.crew}></Directors>
              </div>

              <div className="movieInfo">
                Writers :<Writers writer={movieCast?.crew}></Writers>
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
                <Casts
                  movieCast={movieCast?.cast}
                ></Casts>
              </div>
              <div className="movieInfo">TRAILER </div>

              <Trailers
                movieTrailer={movieInfo?.videos.results}
              ></Trailers>
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
