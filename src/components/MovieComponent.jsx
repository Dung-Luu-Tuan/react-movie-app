import { Link } from "react-router-dom";

const MovieComponent = (props) => {
  const { title, release_date, id, poster_path } = props.movie;

  return (
    <div className="searchMovieContainer">
      <Link to={"/movie/" + id} style={{ textDecoration: "none" }}>
        <img
          id="posterSearch"
          alt=""
          src={"https://image.tmdb.org/t/p/original/" + poster_path}
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
