import { Link } from "react-router-dom";

const MovieComponent = (props) => {
  const { title, release_date, id, poster_path } = props.movie;

  return (
    <Link to={"/movie/" + id} style={{ textDecoration: "none" }}>
      <div className="searchMovieContainer">
        <img
          id="posterSearch"
          alt=""
          src={"https://image.tmdb.org/t/p/original/" + poster_path}
        />
        <span className="nameSearch">{title}</span>
        <div className="infoSearch">
          <span className="releaseDay">{release_date}</span>
        </div>
      </div>
    </Link>
  );
};
export default MovieComponent;
