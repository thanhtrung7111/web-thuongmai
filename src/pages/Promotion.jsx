import React, { useEffect } from "react";
import PromotionComponent from "../components/promotion/PromotionComponent";
import { useDispatch } from "react-redux";
// import { loadPmtPmtnPrgr } from "../redux/actions/commonAction";

const Promotion = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadPmtPmtnPrgr());
  // }, []);
  return <PromotionComponent />;
};

export default Promotion;
