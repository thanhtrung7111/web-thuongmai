import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import InfoPage from "../InfoPage";
import PromotionCard from "./PromotionCard";
import { useSelector } from "react-redux";
import LoadingView from "../../pages/LoadingView";
const PromotionComponent = () => {
  const { lstPmtPmtnPrgr, isLoadingCommon } = useSelector(
    (state) => state.common
  );
  const [pmtPmtnPrgr, setPmtPmtnPrgr] = useState([]);

  return isLoadingCommon ? (
    <LoadingView></LoadingView>
  ) : (
    <div className="xl:container xl:mx-auto mx-5">
      <InfoPage data={["Chương trình khuyến mãi"]} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {lstPmtPmtnPrgr?.map((item) => {
          return (
            <PromotionCard
              item={item}
              title={"PrgrName"}
              beginDate={"Beg_Date"}
              endDate={"End_Date"}
            ></PromotionCard>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionComponent;
