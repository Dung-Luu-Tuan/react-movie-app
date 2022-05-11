import errorImg from "../picture/poster-error.png"
import { Link } from "react-router-dom";

const CastParticipated = (props) => {
    return (
        <>
        {props.participates?.map((participate, index) => (
            <div className="participate-content" key={index}>
                <Link to={`/movie/${participate.id}`} >
                <img className="poster" 
                    src={participate.poster_path ? 
                        `https://image.tmdb.org/t/p/original/${participate.poster_path}`
                        : errorImg
                    } 
                    alt= {participate.title}
                    />
                </Link>
                <div >{participate.original_title}</div>
                <div className="light-text" >{participate.character}</div>
            </div>
        ))}
        </>
    )
} 
export default CastParticipated;