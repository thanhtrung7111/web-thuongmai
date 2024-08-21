import React, { useEffect } from "react";
import SearchProductComponent from "../components/searchProduct/SearchProductComponent";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ProductSearch = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const keyword = searchParam.get("name");
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     searchProduct({
  //       DCMNCODE: "appPrdcList",
  //       PARACODE: "001",
  //       LCTNCODE: "001",
  //       LGGECODE: "{{0302}}",
  //       SCTNCODE: 1,
  //       JSTFDATE: "1990-01-01",
  //       KEY_WORD: "%",
  //       SHOPCODE: "%",
  //       CUSTCODE: "%",
  //       // reload: true,
  //     })
  //   );
  // }, [keyword]);
  return <SearchProductComponent searchName={keyword}></SearchProductComponent>;
};

export default ProductSearch;
