import React, { useEffect, useState } from "react";
import PayDetailComponent from "../components/payDetail/PayDetailComponent";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "./LoadingView";
const PayDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadData() {
      // dispatch(
      //   loadProduct({
      //     DCMNCODE: "appPrdcList",
      //     PARACODE: "001",
      //     LCTNCODE: "001",
      //     LGGECODE: "{{0302}}",
      //     SCTNCODE: 1,
      //     JSTFDATE: "1990-01-01",
      //     KEY_WORD: "%",
      //     SHOPCODE: "%",
      //     CUSTCODE: "%",
      //   })
      // );
      // dispatch(loadWareHouse());
      // dispatch(loadLocations());
      // dispatch(loadCUOM());
      // dispatch(loadTimeType());
      // dispatch(loadDlvrType());
      // dispatch(loadDcmnSbCd());
      // dispatch(loadDlvrMthd());
      // dispatch(loadListHour());
      // dispatch(loadinpCustOdMtPayMthd2());
    }
    loadData();
  }, []);

  return <PayDetailComponent></PayDetailComponent>;
};

export default PayDetail;
