import React, { useEffect, useState } from "react";

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
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  // console.log(image);
  return (
    <img
      loading="lazy"
      src={
        !isLoading && url != ""
          ? image
          : "https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png"
      }
      className={`size-36 object-top object-cover ${className}`}
    />
  );
};

export default ImageFetch;
