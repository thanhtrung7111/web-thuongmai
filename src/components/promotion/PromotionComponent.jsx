import React from "react";
import Wrapper from "@components/Wrapper";
import InfoPage from "@components/InfoPage";
import PromotionCard from "./PromotionCard";
const PromotionComponent = () => {
  return (
    <div className="xl:container xl:mx-auto mx-5">
      <InfoPage data={["Chương trình khuyến mãi"]} />
      <div className="grid grid-cols-2 gap-3">
        <PromotionCard></PromotionCard>
        <PromotionCard></PromotionCard>
        <PromotionCard></PromotionCard>
        <PromotionCard></PromotionCard>
        <PromotionCard></PromotionCard>
        <PromotionCard></PromotionCard>
        <PromotionCard></PromotionCard>
      </div>
    </div>
  );
};

export default PromotionComponent;
