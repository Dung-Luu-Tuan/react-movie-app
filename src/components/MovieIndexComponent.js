import React from "react";
import { useState, useEffect } from "react";
import { API_KEY } from "../App";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

//SwiperStyle
const StyleSwiperMulti = {
  modules: [Pagination, Navigation],
  slidesPerView: 3.5,
  spaceBetween: 10,
  slidesPerGroup: 3,
  touchStartPreventDefault: false,
  navigation: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  loop: false,
  className: "mySwiper",
  onSwiper: (swiper) => console.log(swiper),
  onSlideChange: () => console.log("slide change"),
};

const StyleSwiperSingle = {
  modules: [Autoplay, Navigation, Pagination, Scrollbar, A11y],
  spaceBetween: 50,
  touchStartPreventDefault: false,
  slidesPerView: 1,
  loop: true,
  navigation: true,
  pagination: { clickable: true },
  autoplay: { delay: 2500, disableOnInteraction: false },
  onSwiper: (swiper) => console.log(swiper),
  onSlideChange: () => console.log("slide change"),
};

//Container flex left
const LeftSide = () => {
  return (
    <div className="leftSide">
      <AppInfo />
      <Link to={`/search`} style={{textDecoration : "none"}}>
      <div className="leftSide__searchSelect">
        
        <img
          className="leftSide__searchSelect-icon"
          src="/search-icon.svg"
          alt=""
        />
        <span className="leftSide__searchSelect-title">Tìm kiếm</span>
      
      </div>
      </Link>
    </div>
  );
};

const AppInfo = () => {
  return (
    <div className="leftSide__appInfo">
      <img className="leftSide__appInfo-logo" src="/movie-icon.svg" alt="" />
      <div className="leftSide__appInfo-title">React Movie App</div>
    </div>
  );
};

//Container flex middle
const MiddleSide = (props) => {
  return (
    <div className="middleSide">
      <div className="slideShowTop">
        <Swiper {...StyleSwiperSingle}>
          {props.slideShowTop?.slice(0, 5).map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/movie/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                className="slideShowTop__picture"
                alt=""
              />
              </Link>
              <span className="slideShowTop__title">
                {item.original_name || item.title}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <SlideShowBottom api={props.slideShowBottom_1} title={props.title1} />
      <SlideShowBottom api={props.slideShowBottom_2} title={props.title2} />
      <SlideShowBottom api={props.slideShowBottom_3} title={props.title3} />
    </div>
  );
};
//Container flex middle slide show on bottom
const SlideShowBottom = (props) => {
  return (
    <div className="slideShowBottom">
      <h1>{props.title}</h1>
      <Swiper {...StyleSwiperMulti}>
        {props.api?.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideShowBottomItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SlideShowBottomItem = (props) => {
  return (
    <>
    <Link to={`/movie/${props.item?.id}`}>
      <img
        className="slideShowBottom__picture"
        src={`https://image.tmdb.org/t/p/original/${props.item?.poster_path}`}
        alt=""
      />
      </Link>
      <span className="slideShowBottom__title">
        {props.item.original_name || props.item.title}
      </span>
    </>
  );
};

//Container flex right
const RightSide = (props) => {
  return (
    <div className="rightSide">
      <h1>Top Searches</h1>
      <div className="topSearches">
        {props.api?.map((item, index) => (
          <Link to={`/movie/${item?.id}`} style={{textDecoration : 'none'}} >
          <div className="topSearches__item" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
              className="topSearches__item-picture"
              alt=""
            />
            <span className="topSearches__item-title">
              {item.original_name || item.title}
            </span>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

//CallApi
const MovieIndexComponent = () => {
  const [slideshowAll, setSlideshowAll] = useState();
  const [slideshowMovie, setSlideshowMovie] = useState();
  const [slideshowTv, setSlideshowTv] = useState();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((response) => setSlideshowAll(response.data.results));
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then((response) => setSlideshowMovie(response.data.results));
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`)
      .then((response) => setSlideshowTv(response.data.results));
  }, []);

  return (
    <div className="containerMain">
      <LeftSide />
      <MiddleSide
        slideShowTop={slideshowAll}
        slideShowBottom_1={slideshowMovie}
        title1={"Hot Movies"}
        slideShowBottom_2={slideshowTv}
        title2={"TV Shows"}
        slideShowBottom_3={slideshowMovie}
        title3={"Trending Now"}
      ></MiddleSide>
      <RightSide api={slideshowMovie} />
    </div>
  );
};
export default MovieIndexComponent;
