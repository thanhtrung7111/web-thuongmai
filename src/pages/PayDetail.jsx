import React, { useEffect, useState } from "react";
import PayDetailComponent from "@components/payDetail/PayDetailComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCUOM,
  loadDcmnSbCd,
  loadDlvrMthd,
  loadDlvrType,
  loadListHour,
  loadLocations,
  loadProduct,
  loadTimeType,
  loadWareHouse,
  loadinpCustOdMtPayMthd2,
} from "../redux/actions/commonAction";
import LoadingView from "./LoadingView";
const PayDetail = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {
    isLoadingCommon,
    products,
    lstWareHouse,
    lstDcmnSbCd,
    lstDlvrMthd,
    lstDlvrType,
    lstListHour,
    lstinpCustOdMtPayMthd2,
    lstTimeType,
    lstCUOM,
  } = useSelector((state) => state.common);
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
      dispatch(loadWareHouse());
      // dispatch(loadLocations());
      dispatch(loadCUOM());
      dispatch(loadTimeType());
      dispatch(loadDlvrType());
      dispatch(loadDcmnSbCd());
      dispatch(loadDlvrMthd());
      dispatch(loadListHour());
      dispatch(loadinpCustOdMtPayMthd2());
    }
    loadData();
  }, []);
  useEffect(() => {
    if (isLoadingCommon == false) {
      setIsLoading(false);
    }
  }, [isLoadingCommon]);
  return isLoading ? (
    <LoadingView></LoadingView>
  ) : (
    <PayDetailComponent></PayDetailComponent>
  );
};

export default PayDetail;
