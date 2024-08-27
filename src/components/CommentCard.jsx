import React from "react";
import Avatar from "../assets/img/avatar.jpg";
import moment from "moment";
import ImageFetch from "./ImageFetch";
import { useFetchMaktStdrQuery } from "../redux/query/commonQuery";
const CommentCard = ({
  name,
  amountStar = 0,
  timeStamp,
  title,
  content,
  image,
}) => {
  const { data, isLoading, isError } = useFetchMaktStdrQuery();
  console.log(data);
  return (
    <div className="flex gap-x-1 border-b border-gray-100 pb-4">
      <ImageFetch
        url={image ? image : ""}
        className={"!size-16 !rounded-full mr-2"}
        imageDefault="https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"
      ></ImageFetch>
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-3 items-center">
          <h4 className="text-base font-semibold text-gray-dark">
            {name ? name : "Someone"}
          </h4>
          <div className="gap-x-1 flex items-center h-fit">
            {[1, 2, 3, 4, 5].map((item) => {
              if (item <= amountStar) {
                return <i className="ri-star-fill text-yellow-400 text-xs"></i>;
              } else {
                return <i className="ri-star-line text-yellow-400 text-xs"></i>;
              }
            })}
          </div>
        </div>
        {/* <div>
          {detail.map((item) => {
            return (
              <span>
                {data ? data.find((i) => 1 == item.STDRCODE).ITEMAME : ""}
              </span>
            );
          })}
        </div> */}
        <span className="text-xs text-gray-light italic tracking-widest">
          {moment(timeStamp).format("DD-MM-yyyy ")}
        </span>
        {/* <h5 className="text-gray-dark font-medium ml-3 text-sm">
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
        </h5> */}
        <p className="text-gray-dark ml-2 text-sm">{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
