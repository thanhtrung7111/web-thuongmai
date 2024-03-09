import React from "react";
import Avatar from "../assets/img/avatar.jpg";
import moment from "moment";
const CommentCard = ({ name, amountStar, timeStamp, title, content }) => {
  return (
    <div className="flex gap-x-1 border-b border-gray-100 pb-4">
      <img src={Avatar} alt="" className="size-16" />
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-3 items-center">
          <h4 className="text-base font-medium text-gray-dark">{name}</h4>
          <div className="gap-x-1 flex items-center h-fit">
            {amountStar &&
              [...Array(amountStar)].map((item) => {
                return <i className="ri-star-fill text-yellow-400 text-xs"></i>;
              })}
          </div>
        </div>
        <span className="text-xs text-gray-light italic">
          {moment(timeStamp).format("HH:mm DD/MM/yyyy ")}
        </span>
        <h5 className="text-gray-dark font-medium ml-3 text-sm">
          "Sản phẩm
          {amountStar == 5
            ? " tuyệt với"
            : amountStar == 4
            ? " tốt"
            : amountStar == 3
            ? " bình thường"
            : amountStar == 2
            ? " kém"
            : " tệ"}
          "
        </h5>
        <p className="text-gray-dark ml-7 text-sm">{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
