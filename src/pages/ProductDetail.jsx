import React, { useEffect, useState } from "react";
import ProductDetailComponent from "@components/productDetail/ProductDetailComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "@redux/actions/productAction";
import LoadingView from "./LoadingView";
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoadingProduct } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(
      fetchProductDetail({
        DCMNCODE: "appPrdcDetl",
        PARACODE: "001",
        KEY_CODE: id,
      })
    );
  }, []);
  return isLoadingProduct ? (
    <LoadingView />
  ) : (
    <ProductDetailComponent></ProductDetailComponent>
  );
};

export default ProductDetail;
