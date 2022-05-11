import { Link } from "react-router-dom";

const MovieComponent = (props) => {
  // console.log("Movie: " , props.movie)
  const { title, release_date, id, poster_path } = props.movie;

  return (
    <div
      className="searchMovieContainer"
      onClick={() => props.onMovieSelect(id)}
    >
      <Link to={"/movie/" + id} style={{ textDecoration: "none" }}>
        <img
          id="posterSearch"
          src={"https://image.tmdb.org/t/p/original/" + poster_path}
          alt=""
        />
        <span className="nameSearch">{title}</span>
        <div className="infoSearch">
          <span className="releaseDay">{release_date}</span>
        </div>
      </Link>
    </div>
  );
};
export default MovieComponent;
