import React, { useEffect, useState } from "react";
import AnimateSkeleton from "./AnimateSkeleton";
import { useSelector } from "react-redux";
import axios from "axios";
const ImageFetch = ({ url, className }) => {
  const [image, setImage] = useState({
    data: null,
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // async function fetchImage() {
    //   setIsLoading(false);
    //   const imgeUrl = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       TOKEN:
    //         sessionStorage.getItem("tokenLocation") ||
    //         sessionStorage.getItem("tokenUser") ||
    //         sessionStorage.getItem("tokenInitial"),
    //     },
    //   })
    //     .then((response) => {
    //       // console.log(response);
    //       return response.blob();
    //     })
    //     .then((blob) => {
    //       // console.log(URL.createObjectURL(blob));
    //       return URL.createObjectURL(blob);
    //     });

    //   setImage(imgeUrl);
    //   setIsLoading(true);
    // }

    const fetchImage = async () => {
      setImage({ data: null, isLoading: true });
      try {
        const response = await axios.get(url, {
          responseType: "blob",
          headers: {
            TOKEN:
              sessionStorage.getItem("tokenLocation") ||
              sessionStorage.getItem("tokenUser") ||
              sessionStorage.getItem("tokenInitial"),
          },
        });
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage({ data: imageObjectURL, isLoading: false });
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    fetchImage();
  }, [url]);
  return image.isLoading ? (
    <AnimateSkeleton className={`size-36  ${className}`}></AnimateSkeleton>
  ) : (
    <img
      src={image.data}
      className={`size-36 object-top object-cover ${className}`}
    />
  );
};

export default ImageFetch;
