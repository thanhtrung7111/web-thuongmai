import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const BannerSlider = ({ data }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      speed={500}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      // pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      loop={true}
      className="h-full w-full"
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        swiper.params.navigation.nextEl = navigationNextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
    >
      {data &&
        data.map((item) => {
          return (
            <SwiperSlide>
              <img
                src={item}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </SwiperSlide>
          );
        })}
      ;
      <div
        ref={navigationPrevRef}
        className="absolute top-[50%] -translate-y-[50%] lg:left-10 left-1 cursor-pointer z-50 py-4 px-3 bg-black bg-opacity-20 text-white"
      >
        <i class="ri-arrow-left-s-line"></i>
      </div>
      <div
        ref={navigationNextRef}
        className="absolute top-[50%] -translate-y-[50%] lg:right-10 right-1 cursor-pointer z-50 py-4 px-3 bg-black bg-opacity-20 text-white"
      >
        <i class="ri-arrow-right-s-line"></i>
      </div>
    </Swiper>
  );
};

export default BannerSlider;
