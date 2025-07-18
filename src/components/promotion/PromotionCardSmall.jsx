import React from "react";
import Asus from "../../assets/img/asus.jpg";
import Wrapper from "../Wrapper";
import moment from "moment";
import ImageFetch from "../ImageFetch";
const PromotionCardSmall = ({
  item,
  title,
  desc,
  beginDate,
  endDate,
  tag,
  url,
}) => {
  console.log(url);
  return (
    <div className="group/promotion cursor-pointer shadow-md rounded-md overflow-hidden">
      <Wrapper>
        <div className="flex">
          <div className="h-36 w-36 overflow-hidden shrink-0">
            <ImageFetch
              url={url}
              id={url}
              alt=""
              className="group-hover/promotion:scale-125 object-cover object-center h-full w-full transition-transform"
            />
          </div>
          <div className="p-5 flex flex-col gap-y-1">
            <h3 className="text-slate-700 text-lg font-bold">{item[title]}</h3>
            <p className="text-sm text-slate-500">{item[desc]}</p>
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
            {/* <a
              href="#"
              className="text-sm py-1 text-second inline-block hover:translate-x-2 transition-transform"
            >
              Xem chi tiết <i className="ri-arrow-right-s-line"></i>
            </a> */}
            <div>
              <span className="text-sm text-slate-700">Tags:</span>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PromotionCardSmall;
