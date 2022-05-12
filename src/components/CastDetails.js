import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../App";
import CastParticipated from "./CastParticipated";

// https://api.themoviedb.org/3/person/1136406?api_key=1ffbb6c9f0d5b48932c257b5d05f2a8e&append_to_response=credits
// https://api.themoviedb.org/3/person/1136406/movie_credits?api_key=1ffbb6c9f0d5b48932c257b5d05f2a8e
const CastDetails = () => {
  const [castDetail, setCastDetail] = useState();
  const { castId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${castId}?api_key=${API_KEY}&append_to_response=credits`
      )
      .then((respone) => setCastDetail(respone.data));
  }, []);
  return (
    <>
      <div className="castDetails">
        <div className="left-col">
          <img
            className="detailImg"
            src={`https://image.tmdb.org/t/p/original/${castDetail?.profile_path}`}
            alt=""
          />
          <div className="title">
            Personal infomation
            <dl>
              <dt>Job</dt>
              <dd className="light-text">{castDetail?.known_for_department}</dd>
              <dt>Gender</dt>
              {castDetail?.gender === "1" ? (
                <dd className="light-text">Women</dd>
              ) : (
                <dd className="light-text">Men</dd>
              )}
              <dt>Day of birth</dt>
              <dd className="light-text">{castDetail?.birthday}</dd>
              <dt>Place of birth</dt>
              <dd className="light-text">{castDetail?.place_of_birth}</dd>
            </dl>
          </div>
        </div>

        <div className="right-col">
          <div className="actor-name margin-2">{castDetail?.name}</div>
          <h4 className="font-600 margin-2">About</h4>
          <div className="light-text margin-2">{castDetail?.biography}</div>
          <h4 className="font-600 margin-2">Movies participated</h4>
          <div className="movie-participated">
            <CastParticipated participates={castDetail?.credits.cast}>
              {" "}
            </CastParticipated>
          </div>
        </div>
      </div>
    </>
  );
};

export default CastDetails;
