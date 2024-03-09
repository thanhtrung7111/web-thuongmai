import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "@redux/actions/commonAction";
import ProductListComponent from "@components/productList/ProductListComponent";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const value = searchParam.get("search");
  console.log(value);
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
  }, []);

  return <ProductListComponent search={value}></ProductListComponent>;
};

export default ProductList;
