import React, { Suspense, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "@components/home/HomeComponent";
import { loadProduct } from "@redux/actions/commonAction";
import AppContext from "../context/AppContext";
import LoadingView from "./LoadingView";
import HomeSkeleton from "../components/home/HomeSkeleton";
const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoadingCommon } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(true);
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
        reload: true,
      })
    );
    console.log("HOme");
  }, []);
  useEffect(() => {
    if (products?.length != null && isLoadingCommon == false) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [products]);
  return loading ? <HomeSkeleton /> : <HomeComponent></HomeComponent>;
};

export default Home;
