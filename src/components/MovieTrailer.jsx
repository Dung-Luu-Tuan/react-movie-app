import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const MovieTrailer = (props) => {
  return (
    <div className="movieTrailer">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        // loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {props.movieTrailer?.slice(0, 5).map((video, index) => (
          <SwiperSlide key={index}>
            <div className="trailer">
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${video.key}?html5=1&enablejsapi=1;rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                title="Trailer on youtube"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieTrailer;
