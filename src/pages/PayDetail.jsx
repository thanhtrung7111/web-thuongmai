import React, { useEffect } from "react";
import PayDetailComponent from "@components/payDetail/PayDetailComponent";
import { useDispatch } from "react-redux";
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
const PayDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
    dispatch(loadLocations());
    dispatch(loadCUOM());
    dispatch(loadTimeType());
    dispatch(loadDlvrType());
    dispatch(loadDcmnSbCd());
    dispatch(loadDlvrMthd());
    dispatch(loadListHour());
    dispatch(loadinpCustOdMtPayMthd2());
  }, []);
  return <PayDetailComponent></PayDetailComponent>;
};

export default PayDetail;
