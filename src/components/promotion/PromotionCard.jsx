import React from "react";
import Asus from "@assets/img/asus.jpg";
import Wrapper from "@components/Wrapper";
const PromotionCard = () => {
  return (
    <div className="group/promotion cursor-pointer">
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
            <h3 className="text-gray-dark text-lg font-bold">
              Mua hai sản phẩm bất kì được tặng một sản phẩm cùng loại
            </h3>
            <p className="text-sm text-gray-dark">
              Khi bạn mua 2 sản phẩm cùng loại sẽ được tặng them một sản phẩm
              cùng loại.
            </p>
            <p className="text-sm text-gray-dark">
              Thời gian áp dụng từ ngày{" "}
              <span className="font-medium">24-02-2006</span> đến ngày{" "}
              <span className="font-medium">24-02-2006</span>
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
