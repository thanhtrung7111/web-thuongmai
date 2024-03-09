import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const SliderCustom = ({children}) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay="true"
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      // pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      loop="true"
      className="h-full w-full"
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        swiper.params.navigation.nextEl = navigationNextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
          slidesPerGroup: 1,
        },
        1336: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
    >
      {data &&
        data.map((item) => {
          return (
            <SwiperSlide>
              <ProductCard></ProductCard>
            </SwiperSlide>
          );
        })}
      <div
        ref={navigationPrevRef}
        className="absolute top-[50%] -translate-y-[50%] left-0 cursor-pointer z-50 py-4 px-3 bg-black bg-opacity-20 text-white"
      >
        <i class="ri-arrow-left-s-line"></i>
      </div>
      <div
        ref={navigationNextRef}
        className="absolute top-[50%] -translate-y-[50%] right-0 cursor-pointer z-50 py-4 px-3 bg-black bg-opacity-20 text-white"
      >
        <i class="ri-arrow-right-s-line"></i>
      </div>
    </Swiper>
  );
};

export default SliderCustom;
