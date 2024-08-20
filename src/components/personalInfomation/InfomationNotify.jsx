import React, { useState } from "react";
import TabComponent from "../TabComponent";
import { useDispatch } from "react-redux";
import Panigation from "./../panigation/Panigation";

import RowNotify from "./RowNotify";
const menu = [
  { tabId: 1, nameTab: "Tất cả" },
  { tabId: 2, nameTab: "Đơn hàng" },
  { tabId: 3, nameTab: "Khuyến mãi" },
  //   { tabId: 4, nameTab: "Đã thanh toán" },
  //   { tabId: 5, nameTab: "Đã hủy" },
];

const data = [
  {
    title: "Giao hàng thành công",
    description: "Đơn hàng #55566888 của bạn đã giao thành công",
    img: "",
    date: "2024-05-12",
    category: "order",
    isRead: false,
  },
  {
    title: "Đánh giá sản phẩm #55509090",
    description: "Hãy đánh giá sản phẩm bạn mua ",
    img: "",
    date: "2024-05-12",
    category: "evaluate",
    isRead: false,
  },
  {
    title: "Đánh giá sản phẩm #55509090",
    description: "Hãy đánh giá sản phẩm bạn mua ",
    img: "",
    date: "2024-05-12",
    category: "evaluate",
    isRead: true,
  },
  {
    title: "Đánh giá sản phẩm #55509090",
    description: "Hãy đánh giá sản phẩm bạn mua ",
    img: "",
    date: "2024-05-12",
    category: "evaluate",
    isRead: true,
  },
  {
    title: "Đánh giá sản phẩm #55509090",
    description: "Hãy đánh giá sản phẩm bạn mua ",
    img: "",
    date: "2024-05-12",
    category: "evaluate",
    isRead: true,
  },
  {
    title: "Đánh giá sản phẩm #55509090",
    description: "Hãy đánh giá sản phẩm bạn mua ",
    img: "",
    date: "2024-05-12",
    category: "evaluate",
    isRead: true,
  },
];

const pageSize = 4;
const InfomationNotify = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(menu[0]);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-gray-dark font-medium text-xl">Thông báo</h5>
        <span className="text-sm text-gray-dark hover:text-second cursor-pointer">
          Đánh dấu đã đọc tất cả
        </span>
      </div>
      <div>
        <TabComponent
          id="tabId"
          name="nameTab"
          data={menu}
          currentIndex={tabIndex}
          onChange={(item) => setTabIndex(item)}
        ></TabComponent>
      </div>
      <div className="min-h-[500px] gap-y-2 flex flex-col mb- py-2">
        {data
          .slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
          .map((item) => {
            return (
              <RowNotify
                key={item.title}
                title={item.title}
                desc={item.description}
                date={item.date}
                category={item.category}
                isRead={item.isRead}
              ></RowNotify>
            );
          })}
      </div>
      <Panigation
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        scrollTo="evaluate"
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      ></Panigation>
    </div>
  );
};

export default InfomationNotify;
