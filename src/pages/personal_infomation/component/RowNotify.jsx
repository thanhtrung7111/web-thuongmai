import React, { useState } from "react";
import Asus from "../../../assets/img/asus.jpg";
import { useDispatch } from "react-redux";
import moment from "moment";
const RowNotify = ({ title, desc, date, category, isRead }) => {
  const dispatch = useDispatch();
  const [read, setRead] = useState(isRead);
  const openDetail = () => {
    category !== "evaluate"
      ? dispatch(openDetailOrder({ orderID: "555" }))
      : dispatch(openEvaluateProduct({ productID: "555" }));
  };

  const onClickRead = () => {
    setRead(true);
  };

  return (
    <div
      className={`flex gap-x-4 ${read ? "bg-gray-50" : "bg-orange-100"} p-2`}
    >
      <img
        src={Asus}
        alt=""
        className="size-24 object-contain object-center border bg-white border-gray-50"
      />
      <div className="text-gray-dark flex-auto">
        <h5 className="font-normal text-base">{title}</h5>
        <p className="text-sm font-light">{desc}</p>
        <span className="text-gray-light text-xs">
          {moment(date).format("DD/MM/yyyy")}
        </span>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          className="px-2 py-1 w-fit bg-white text-gray-dark border border-gray-light rounded-sm text-xs"
          onClick={openDetail}
        >
          {category == "evaluate" ? "Đánh giá" : "Xem chi tiết"}
        </button>
        {!read && (
          <span
            className="text-xs text-gray-light hover:text-second cursor-pointer"
            onClick={onClickRead}
          >
            Đánh dấu đã đọc
          </span>
        )}
      </div>
    </div>
  );
};

export default RowNotify;
