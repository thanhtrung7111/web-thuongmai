import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "@components/home/HomeComponent";
import { loadProduct } from "@redux/actions/commonAction";
import AppContext from "../context/AppContext";
const Home = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AppContext);
  useEffect(() => {
    dispatch(
      loadProduct({
        DCMNCODE: "appPrdcList",
        PARACODE: "001",
        LCTNCODE: "001",
        LGGECODE: "{{0302}}",
        SCTNCODE: 1,
        JSTFDATE: "1990-01-01",
        KEY_WORD: "%",
        SHOPCODE: "%",
        CUSTCODE: "%",
      })
    );
    console.log("HOme");
  }, []);
  return (
    <>
      <HomeComponent></HomeComponent>;
    </>
  );
};

export default Home;
