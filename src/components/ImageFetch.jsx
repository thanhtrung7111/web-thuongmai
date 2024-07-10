import React, { useEffect, useState } from "react";
import AnimateSkeleton from "./AnimateSkeleton";
const ImageFetch = ({ url, className }) => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchImage() {
      const imgeUrl = await fetch(url, {
        method: "GET",
        headers: {
          TOKEN: sessionStorage.getItem("tokenUser"),
        },
      })
        .then((response) => {
          // console.log(response);
          return response.blob();
        })
        .then((blob) => {
          // console.log(URL.createObjectURL(blob));
          return URL.createObjectURL(blob);
        });

      setImage(imgeUrl);
    }
    fetchImage();
  }, []);
  useEffect(() => {
    if (image != "") {
      setIsLoading(false);
    }
  }, [image]);
  // console.log(image);
  return isLoading ? (
    <AnimateSkeleton className={`size-36  ${className}`}></AnimateSkeleton>
  ) : (
    <img
      src={image}
      className={`size-36 object-top object-cover ${className}`}
    />
  );
};

export default ImageFetch;
