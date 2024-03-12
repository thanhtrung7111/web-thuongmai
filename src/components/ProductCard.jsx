import React, { useEffect, useState } from "react";
import Asus from "../assets/img/asus.jpg";
import { NavLink } from "react-router-dom";
import { addToCart } from "@redux/actions/cartAction.js";
import { useDispatch } from "react-redux";
import NoImage from "@assets/img/noimage.png";
import ImageFetch from "./ImageFetch";
const ProductCard = ({
  item,
  id,
  name,
  image,
  price,
  saleOff,
  discount,
  reviews,
  unit,
  stars,
  sold,
}) => {
  const dispatch = useDispatch();
  const handleAddProductToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        ...item,
      })
    );
  };

  return (
    <div
      className={`group/product bg-white shadow-md w-full border-t border-b border-gray-100 flex flex-col items-center`}
    >
      <div className="relative w-full h-40 mb-3 overflow-hidden">
        <div className="text-xs absolute top-2 left-2 bg-slate-500 px-2 py-1 text-white z-10">
          {item[unit]}
        </div>

        <div className="invisible group-hover/product:visible absolute top-0 right-0 h-full w-full bg-black bg-opacity-20 flex items-center justify-center">
          <NavLink
            to={`/products/${item[id]}`}
            className="text-xs text-white bg-black bg-opacity-90 py-2 px-5 rounded-sm hover:opacity-85"
          >
            Xem chi tiết
          </NavLink>
        </div>
        <ImageFetch
          url={item[image]}
          className={"!w-full !h-full"}
        ></ImageFetch>
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
