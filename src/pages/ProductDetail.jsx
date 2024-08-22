import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "./LoadingView";
import ProductDetailSkeleton from "../components/productDetail/ProductDetailSkeleton";
import { fetchProductDetail } from "../redux/actions/productAction";
import ProductDetailComponent from "../components/productDetail/ProductDetailComponent";
const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductDetail({
        DCMNCODE: "appPrdcDetl",
        PARACODE: "001",
        KEY_CODE: id,
      })
    );
  }, [id]);
  return <ProductDetailComponent></ProductDetailComponent>;
};

export default ProductDetail;
