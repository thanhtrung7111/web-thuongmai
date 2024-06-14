import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "@redux/actions/commonAction";
import ProductListComponent from "@components/productList/ProductListComponent";
import { useSearchParams } from "react-router-dom";
import { loadLstQUOM } from "../redux/actions/commonAction";
import { changeAmoutProduct } from "../redux/actions/cartAction";

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const value = searchParam.get("search");
  const [loading, setLoading] = useState(true);
  console.log(value);
  useEffect(() => {
    dispatch(
      loadProduct({
        DCMNCODE: "appPrdcList",
        PARACODE: "001",
        LCTNCODE: "%",
        LGGECODE: "{{0302}}",
        SCTNCODE: 1,
        JSTFDATE: "1990-01-01",
        KEY_WORD: value ? value : "%",
        SHOPCODE: "%",
        CUSTCODE: "%",
      })
    );
    dispatch(loadLstQUOM());
  }, [value]);

  return <ProductListComponent search={value}></ProductListComponent>;
};

export default ProductList;
