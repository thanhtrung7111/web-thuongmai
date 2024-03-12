import React, { useEffect, useState } from "react";

const ImageFetch = ({ url, className }) => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchImage() {
      await fetch(url, {
        method: "GET",
        headers: {
          TOKEN: localStorage.getItem("tokenUser"),
        },
      })
        .then((response) => {
          // console.log(response);
          return response.blob();
        })
        .then((blob) => {
          // console.log(URL.createObjectURL(blob));
          setImage(URL.createObjectURL(blob));
        });
    }
    fetchImage();
    setIsLoading(false);
  }, [url]);
  console.log(image);
  return (
    <img
      loading="lazy"
      src={image}
      className={`${
        isLoading && "animate-pulse"
      } size-36 object-center object-cover ${className}`}
    />
  );
};

export default ImageFetch;
