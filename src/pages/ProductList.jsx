import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListComponent from "../components/productList/ProductListComponent";
import { useSearchParams } from "react-router-dom";
import { changeAmoutProduct } from "../redux/actions/cartAction";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return <ProductListComponent></ProductListComponent>;
};

export default ProductList;
