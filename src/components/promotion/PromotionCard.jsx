import React from "react";
import Asus from "../../assets/img/asus.jpg";
import Wrapper from "../Wrapper";
import moment from "moment";
const PromotionCard = ({ item, title, desc, beginDate, endDate }) => {
  return (
    <div className="group/promotion cursor-pointer shadow-md rounded-md overflow-hidden">
      <Wrapper>
        <div className="flex">
          <div className="h-60 w-96 overflow-hidden">
            <img
              src={Asus}
              alt=""
              className="group-hover/promotion:scale-125 object-cover object-center h-full w-full transition-transform"
            />
          </div>
          <div className="p-5 flex flex-col gap-y-3">
            <h3 className="text-gray-dark text-lg font-bold">{item[title]}</h3>
            <p className="text-sm text-gray-dark">{item[desc]}</p>
            <p className="text-sm text-gray-dark">
              Thời gian áp dụng từ ngày{" "}
              <span className="font-medium">
                {moment(item[beginDate]).format("DD/MM/yyyy")}
              </span>{" "}
              đến ngày{" "}
              <span className="font-medium">
                {moment(item[endDate]).format("DD/MM/yyyy")}
              </span>
            </p>
            <a
              href="#"
              className="text-sm py-1 text-second inline-block hover:translate-x-2 transition-transform"
            >
              Xem chi tiết <i className="ri-arrow-right-s-line"></i>
            </a>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PromotionCard;
