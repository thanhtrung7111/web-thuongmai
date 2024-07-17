import React, { useEffect, useState } from "react";
import ProductDetailComponent from "@components/productDetail/ProductDetailComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "@redux/actions/productAction";
import LoadingView from "./LoadingView";
import ProductDetailSkeleton from "../components/productDetail/ProductDetailSkeleton";
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
