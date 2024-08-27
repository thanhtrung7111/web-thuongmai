import React, { useEffect, useState } from "react";
import AnimateSkeleton from "./AnimateSkeleton";
import { useSelector } from "react-redux";
import axios from "axios";
const ImageFetch = ({ url, className, imageDefault = "" }) => {
  const [image, setImage] = useState({
    data: null,
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cleanup function to revoke object URLs
    return () => {
      if (image.data) {
        URL.revokeObjectURL(image.data);
      }
    };
  }, [image.data]);

  useEffect(() => {
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

    if (url != "" && url != null) {
      fetchImage();
    } else {
      setImage({ data: null, isLoading: false });
    }
  }, [url]);
  return image.isLoading ? (
    <AnimateSkeleton className={`size-36  ${className}`}></AnimateSkeleton>
  ) : (
    <img
      rel="prefetch"
      src={url != "" && url ? image.data : imageDefault}
      className={`size-36 object-top object-cover ${className}`}
    />
  );
};

export default ImageFetch;
