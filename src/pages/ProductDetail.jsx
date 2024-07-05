import React, { useEffect, useState } from "react";
import ProductDetailComponent from "@components/productDetail/ProductDetailComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "@redux/actions/productAction";
import LoadingView from "./LoadingView";
import ProductDetailSkeleton from "../components/productDetail/ProductDetailSkeleton";
const ProductDetail = () => {
  const { id } = useParams();
  const { productDetail, isLoadingProduct } = useSelector(
    (state) => state.product
  );
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoadingProduct == false && productDetail != null) {
      setIsLoading(false);
    }
  }, [isLoadingProduct]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      fetchProductDetail({
        DCMNCODE: "appPrdcDetl",
        PARACODE: "001",
        KEY_CODE: id,
      })
    );
  }, [id]);
  return isLoading ? (
    <ProductDetailSkeleton />
  ) : (
    <ProductDetailComponent></ProductDetailComponent>
  );
};

export default ProductDetail;
