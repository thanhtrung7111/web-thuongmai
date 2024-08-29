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
  // const urlDemo =
  //   "https://api-dev.firstems.com/Api/data/runApi_File?run_Code=DTA001&CompCode=PMC&DcmnCode=Product_New&Key_Code=PMC000000907001&Key_Load=00015218110920";
  // const idDemo = 1;
  const {
    data: dataImage,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchImageQuery({ id: id, url: url }, { skip: !id });

  // console.log(dataImage);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    if (!(dataImage instanceof Blob) || dataImage.size == 0) {
      fetchData();
      console.log("fetch");
    }
  }, [dataImage]);

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
    <AnimateSkeleton className={`size-36  ${className}`}></AnimateSkeleton>
  ) : (
    <img
      rel="prefetch"
      src={isSuccess && image != "" ? image : imageDefault}
      className={`size-36 object-top object-cover ${className}`}
    />
  );
};

export default ImageFetch;
