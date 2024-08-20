import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListComponent from "../components/productList/ProductListComponent";
import { useSearchParams } from "react-router-dom";
import { loadLstQUOM, loadProduct } from "../redux/actions/commonAction";
import { changeAmoutProduct } from "../redux/actions/cartAction";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(
    //   loadProduct({
    //     DCMNCODE: "appPrdcList",
    //     PARACODE: "001",
    //     LCTNCODE: "%",
    //     LGGECODE: "{{0302}}",
    //     SCTNCODE: 1,
    //     JSTFDATE: "1990-01-01",
    //     KEY_WORD: "%",
    //     SHOPCODE: "%",
    //     CUSTCODE: "%",
    //     // reload: true,
    //   })
    // );
    dispatch(loadLstQUOM());
  }, []);

  return <ProductListComponent></ProductListComponent>;
};

export default ProductList;
