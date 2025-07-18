import React, { useEffect, useState } from "react";
import AnimateSkeleton from "./AnimateSkeleton";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useFetchImageQuery,
  useLazyFetchImageQuery,
} from "../redux/query/imageQuery";
const ImageFetch = ({ url, id, className, imageDefault = "" }) => {
  const [image, setImage] = useState("");
  const { errorServer } = useSelector((state) => state.exception);
  let countFetch = 0;
  // const urlDemo =
  //   "https://api-dev.firstems.com/Api/data/runApi_File?run_Code=DTA001&CompCode=PMC&DcmnCode=Product_New&Key_Code=PMC000000907001&Key_Load=00015218110920";
  // const idDemo = 1;
  const {
    data: dataImage,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
  } = useFetchImageQuery(
    { id: id, url: url },
    { skip: !id || errorServer.isError || url == "" }
  );

  // console.log(dataImage);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await refetch();
  //   };
  //   if (
  //     !(dataImage instanceof Blob) ||
  //     (dataImage.size == 0 && countFetch <= 2 && isError == false)
  //   ) {
  //     fetchData();
  //     countFetch++;
  //     console.log("fetch");
  //   }
  // }, [dataImage, isError]);

  useEffect(() => {
    if (dataImage instanceof Blob) {
      const objectURL = URL.createObjectURL(dataImage);
      setImage(objectURL);

      // Giải phóng URL khi không còn cần thiết
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    }
  }, [dataImage]);

  // console.log(dataImage);
  return isLoading ? (
    <AnimateSkeleton className={`${className}`}></AnimateSkeleton>
  ) : (
    <img
      rel="prefetch"
      src={isSuccess && image != "" ? image : imageDefault}
      className={`${className}`}
    />
  );
};

export default ImageFetch;
