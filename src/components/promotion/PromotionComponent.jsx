import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../Wrapper";
import InfoPage from "../InfoPage";
import PromotionCard from "./PromotionCard";
import { useSelector } from "react-redux";
import LoadingView from "../../pages/LoadingView";
import { useFetchPostQuery } from "../../redux/query/commonQuery";
import ProductSlider from "../ProductSlider";
import PromotionCardSmall from "./PromotionCardSmall";
const PromotionComponent = () => {
  const getPosts = useFetchPostQuery();
  const lstPost = useMemo(() => {
    if (!getPosts.data) return [];
    return getPosts.data;
  }, [getPosts.data]);
  return false ? (
    <LoadingView></LoadingView>
  ) : (
    <div className="max-w-7xl mx-auto">
      <InfoPage data={["Tin tức và khuyến mãi"]} />
      <div className="min-h-[600px]">
        <div>
          <div className="grid grid-cols-2 gap-3">
            {getPosts.isLoading ? (
              "Đang tải dữ liệu..."
            ) : lstPost.length == 0 ? (
              <div className="text-sm text-gray-400">
                Hiện tại không có bài viết...
              </div>
            ) : (
              lstPost.map((item) => {
                return (
                  <PromotionCard
                    item={item}
                    url={item?.DCMNFILE[0]?.FILE_URL ?? ""}
                    title={"POSTTITL"}
                    tag={""}
                    beginDate={"Beg_Date"}
                    endDate={"End_Date"}
                  ></PromotionCard>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionComponent;
