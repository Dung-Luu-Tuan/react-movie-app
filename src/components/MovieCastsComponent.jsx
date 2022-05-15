import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import errorImgCast from "../picture/error_img_cast.jpg";

const MovieCastComponent = (props) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        slidesPerGroup={4}
        // loop={true}
        // loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {props.movieCast?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="castInfo">
              <Link to={`/cast/${item.id}`} style={{ textDecoration: "none" }}>
                <img
                  className="castImage"
                  alt=""
                  src={
                    item.profile_path
                      ? "https://image.tmdb.org/t/p/original/" +
                        item.profile_path
                      : errorImgCast
                  }
                />
              </Link>
              <div className="castRealName">{item.name}</div>
              <div className="castName">{item.character}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MovieCastComponent;
