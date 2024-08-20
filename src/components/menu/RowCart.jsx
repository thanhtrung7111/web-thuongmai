import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import NoImage from "../../assets/img//noimage.png";
import ImageFetch from "../ImageFetch";
const RowCart = ({
  item,
  id,
  name,
  image,
  price,
  amount,
  unit,
  saleoff,
  handleDelete,
}) => {
  const [imageState, setImageState] = useState(null);
  const navigate = useNavigate();
  const handleClickDetail = () => {
    navigate("/products/" + item[id]);
  };
  return (
    <div className="group/product grid grid-cols-[1fr_4fr] gap-x-2 text-gray-dark py-2">
      <div
        onClick={handleClickDetail}
        className="border border-gray-200 shadow-lg rounded-xl flex items-center justify-center relative overflow-hidden size-20 cursor-pointer"
      >
        {/* <div className="invisible group-hover/product:visible absolute top-0 right-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <NavLink
            to={`/products/${item[id]}`}
            className="text-xs text-white bg-black bg-opacity-90 py-1 px-1 rounded-sm hover:opacity-85"
          >
            Xem chi tiết
          </NavLink>
        </div> */}
        <ImageFetch url={item[image]} className={"!size-20"} />
      </div>
      <div className="flex flex-auto gap-x-10">
        <div className="flex-auto text-start flex flex-col gap-y-1">
          <h5 className="line-clamp-2 font-medium text-gray-dark text-sm">
            {item[name]}
          </h5>
          {/* <div className="flex items-center gap-x-2">
            <span className="text-xs">Số lượng:</span>{" "}
            <div className="flex items-center gap-x-1">
              <button
                onClick={() => handleSubstract(item[id])}
                className="bg-white border w-6 h-6 flex items-center justify-center text-gray-dark"
              >
                -
              </button>

              <input
                type="text"
                className="bg-white border  h-6 outline-none w-10 text-center text-xs text-gray-dark"
                value={item[amount]}
              />

              <button
                onClick={() => handlePlus(item[id])}
                className="bg-white border w-6 h-6 flex items-center justify-center text-gray-dark"
              >
                +
              </button>
            </div>
          </div> */}
          <div className="flex items-baseline gap-x-2">
            <span className="text-xs">Giá sản phẩm: </span>
            <span className="font-semibold text-second flex items-start text-base">
              {(
                item[price] -
                (item[price] * item[saleoff]) / 100
              )?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          {/* <div className="flex items-baseline gap-x-2">
            <span className="text-xs">Đơn vị tính: </span>
            <span className="font-semibold text-second flex items-start text-base">
              {item[unit]}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RowCart;
