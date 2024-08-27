import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, openPopup } from "../redux/reducer/popupReducer";
import ImageFetch from "./ImageFetch";
// import { closeManify } from "../redux/reducer/popupReducer";

const images = [
  {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 3,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    id: 4,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    id: 5,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 5,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
];
const ImageMagnifier = ({ image, open, onCloseManify }) => {
  const dispatch = useDispatch();
  const [indexImage, setIndexImage] = useState({ ...images[0] });
  const [mainImage, setMainImage] = useState(null);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const handleChangeImage = (id) => {
    setIndexImage(images.find((item) => item.id == id));
    setMainImage(images.find((item) => item.id == id).image);
  };

  useEffect(() => {
    setMainImage(image);
  }, [image]);

  useEffect(() => {
    if (open) dispatch(openPopup());
    else dispatch(closePopup());
  }, [open]);
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-50 flex flex-col items-center justify-center ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        className="absolute  bg-black bg-opacity-50 top-0 right-0 w-full h-full"
        onClick={onCloseManify}
      ></div>
      <div className=" bg-white max-w-[1000px] z-20">
        <div
          className="block text-right pr-2 pt-2 cursor-pointer"
          onClick={onCloseManify}
        >
          <i class="ri-close-line text-2xl text-gray-400"></i>
        </div>
        <div className="p-5 px-10 pt-1">
          <div className="border mb-5">
            <ImageFetch
              url={mainImage}
              alt=""
              className="w-full h-[600px] object-contain object-center"
            />
          </div>
          <div className="max-w-fit">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={5}
              autoplay="true"
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              // pagination={{ clickable: true }}
              //   scrollbar={{ draggable: true }}
              loop="true"
              className="h-full w-full"
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {images.map((item) => {
                return (
                  <SwiperSlide
                    className={`relative px-3 py-2 border  rounded-md border-gray-100 cursor-pointer`}
                    onClick={() => handleChangeImage(item.id)}
                  >
                    <div
                      className={`absolute top-0 right-0 w-full h-full bg-black transition-colors
                       ${
                         indexImage.id == item.id
                           ? "bg-opacity-0"
                           : "bg-opacity-5"
                       }
                      `}
                    ></div>
                    <img
                      src={item.image}
                      className="h-32 w-full object-cover object-top"
                      alt=""
                    />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageMagnifier;
