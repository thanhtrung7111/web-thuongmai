import React, { Suspense, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "./LoadingView";
import HomeSkeleton from "../components/home/HomeSkeleton";
import HomeComponent from "../components/home/HomeComponent";
const Home = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     loadProduct({
  //       DCMNCODE: "appPrdcList",
  //       PARACODE: "001",
  //       LCTNCODE: "001",
  //       LGGECODE: "{{0302}}",
  //       SCTNCODE: 1,
  //       JSTFDATE: "1990-01-01",
  //       KEY_WORD: "%",
  //       SHOPCODE: "%",
  //       CUSTCODE: "%",
  //       reload: true,
  //     })
  //   );
  //   console.log("HOme");
  // }, []);

  return <HomeComponent></HomeComponent>;
};

export default Home;
