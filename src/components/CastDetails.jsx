import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CastParticipated from "./CastParticipated";
import { IMAGE_URL } from "../App";

const CastDetails = () => {
  const [castDetail, setCastDetail] = useState();

  const { castId } = useParams();

  useEffect(() => {
    axios
      .get(`/person/${castId}?append_to_response=credits`)
      .then((response) => setCastDetail(response.data));
  }, [castId]);

  return (
    <>
      <div className="castDetails">
        <div className="left-col">
          <img
            className="detailImg"
            alt=""
            src={`https://image.tmdb.org/t/p/original/${castDetail?.profile_path}`}
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
            <CastParticipated participates={castDetail?.credits.cast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CastDetails;
