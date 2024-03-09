import React, { useEffect, useState } from "react";
import Asus from "../assets/img/asus.jpg";
import { NavLink } from "react-router-dom";
import { addToCart } from "@redux/actions/cartAction.js";
import { useDispatch } from "react-redux";
import NoImage from "@assets/img/noimage.png";
const ProductCard = ({
  item,
  id,
  name,
  image,
  price,
  saleOff,
  discount,
  reviews,
  stars,
  sold,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const handleAddProductToCart = (e) => {
    e.preventDefault();
    if (isLoading) return;
    dispatch(
      addToCart({
        ...item,
      })
    );
  };
  const [imageState, setImageState] = useState(null);
  useEffect(() => {
    // console.log(image);
    async function fetchImage() {
      await fetch(item[image], {
        method: "GET",
        headers: {
          TOKEN: localStorage.getItem("tokenUser"),
        },
      })
        .then((response) => {
          // console.log(response);
          return response.blob();
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setImageState(imageUrl);
          console.log(imageUrl);
        });
    }
    fetchImage();
  }, [image]);

  useEffect(() => {
    if (imageState != null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [imageState]);

  return (
    <div
      className={`${
        isLoading ? "animate-pulse" : ""
      } group/product bg-white shadow-md w-full border-t border-b border-gray-100 flex flex-col items-center`}
    >
      <div className="relative w-full h-40 mb-3">
        <div className="invisible group-hover/product:visible absolute top-0 right-0 h-full w-full bg-black bg-opacity-20 flex items-center justify-center">
          <NavLink
            to={`/products/${item[id]}`}
            className="text-xs text-white bg-black bg-opacity-90 py-2 px-5 rounded-sm hover:opacity-85"
          >
            Xem chi tiết
          </NavLink>
        </div>
        <img
          loading="lazy"
          src={imageState ? imageState : NoImage}
          alt=""
          className="w-full h-full block object-top object-cover mb-3"
        />
        {item[discount] > 0 && (
          <div className="absolute top-0 right-0 text-xs p-1 bg-red-700 text-white">
            -{item[discount]}%
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-1 w-full px-5 pb-8">
        <h5 className="line-clamp-2 font-semibold text-sm text-gray-darked h-10">
          {item[name]}
        </h5>
        <div className="flex gap-x-1">
          <span className="text-second font-bold text-base flex items-start">
            {item[price]?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          <span className="text-gray-light font-thin text-xs  line-through flex items-start">
            {item[saleOff]?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-y-1">
            <p className="text-xs font-medium text-gray-dark flex items-center gap-x-1">
              Đánh giá:{" "}
              <span className="rounded-md px-1 py-[1px] flex items-center justify-between text-white bg-second text-[10px] gap-x-[1px]">
                {item[stars]}
                <i class="ri-star-fill"></i>
              </span>{" "}
              <span className="font-thin text-xs">({item[reviews]})</span>
            </p>
            <p className="text-xs font-medium text-gray-dark flex items-center gap-x-1">
              Đã bán:{" "}
              <span className="font-thin text-xs">
                {item[sold] ? item[sold] : 0}
              </span>
            </p>
          </div>
          <div
            onClick={(e) => handleAddProductToCart(e)}
            className="w-8 h-8 rounded-full bg-second flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-200"
          >
            <i class="ri-shopping-cart-fill text-white text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
