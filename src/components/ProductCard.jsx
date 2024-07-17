import React, { useEffect, useState } from "react";
import Asus from "../assets/img/asus.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { addToCart } from "@redux/actions/cartAction.js";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "@assets/img/noimage.png";
import ImageFetch from "./ImageFetch";
import { toast } from "react-toastify";
const ProductCard = ({
  item,
  id,
  name,
  image,
  price,
  saleOff,
  discount,
  reviews,
  unit,
  stars,
  sold,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const { errorMessageCart } = useSelector((state) => state.cart);
  const [disableAction, setDisableAction] = useState(false);
  const { productCarts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddProductToCart = (e) => {
    e.preventDefault();
    setDisableAction(true);
    console.log(item[id]);
    console.log(currentUser?.USERLGIN);

    const findProduct = productCarts?.find((item) => {
      console.log(item.USERLOGIN, "ZZ");
      console.log(item.PRDCCODE, "ZZ");
      return (
        item.USERLOGIN == currentUser?.USERLGIN && item.PRDCCODE == item[id]
      );
    });
    console.log(findProduct);

    if (findProduct) {
      toast.warning("Sản phẩm đã có trong giỏ hàng!", {
        autoClose: 1500,
        position: "top-center",
      });
      return;
    }
    if (currentUser !== null) {
      dispatch(
        addToCart({
          COMPCODE: item["COMPCODE"],
          LCTNCODE: "001",
          USERLOGIN: currentUser?.USERLGIN,
          PRDCCODE: item[id],
          QUOMQTTY: 1,
          QUOMCODE: item["QUOMCODE"],
          SALEPRCE: item[price],
          DSCNRATE: item[discount],
          PRDCNAME: item["PRDCNAME"],
          PRDCIMAGE: item["PRDCIMGE"],
        })
      );
    } else {
      toast.warning("Bạn cần phải đăng nhập để thêm sản phẩm vào giỏ hàng!", {
        autoClose: 1500,
        position: "top-center",
      });
    }
  };
  // useEffect(() => {
  //   if (errorMessageCart !== "" && errorMessageCart !== null) {
  //     toast.warning("Thêm sản phẩm vào giỏ thất bại", {
  //       autoClose: 2000,
  //     });
  //   } else {
  //     toast.success("Thêm sản phẩm vào giỏ thành công", {
  //       autoClose: 2000,
  //     });
  //   }
  // }, [errorMessageCart]);
  useEffect(() => {
    setTimeout(() => {
      setDisableAction(false);
    }, 1500);
  }, [disableAction === true]);
  return (
    <div
      onClick={() => {
        window.scroll(0, 0);
        navigate(`/products/${item[id]}`);
      }}
      className={`group/product cursor-pointer relative bg-white shadow-sm w-full rounded-lg border overflow-hidden border-gray-200 flex flex-col items-center`}
    >
      <div className="relative w-full h-40 mb-3 overflow-hidden">
        <div className="text-xs absolute top-2 left-2 bg-slate-500 px-2 py-1 text-white z-10 rounded-md">
          {item[unit]}
        </div>

        <div className="opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 absolute top-0 right-0 h-full w-full bg-black bg-opacity-20 flex items-center justify-center">
          <button
            type="button"
            className="text-xs text-white bg-first bg-opacity-95 py-2 px-5 rounded-sm hover:opacity-85"
          >
            <i class="ri-error-warning-line font-thin"></i> Xem chi tiết
          </button>
        </div>
        <ImageFetch
          url={item[image]}
          className={"!w-full !h-full"}
        ></ImageFetch>
        {item[discount] > 0 && (
          <div className="absolute top-0 right-0 text-xs p-1 bg-red-600 text-white">
            -{item[discount]}%
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-1 w-full px-5 pb-8">
        <h5
          className="line-clamp-2 font-semibold text-sm text-gray-600 h-10"
          title={item[name]}
        >
          {item[name]}
        </h5>
        <div className="flex gap-x-1">
          <span className="text-second font-semibold text-xl flex items-start">
            {item[saleOff]?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          <span className="text-gray-light font-thin text-sm  line-through flex items-start">
            {item[saleOff] < item[price] &&
              item[price]?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
          </span>
        </div>
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-y-1 curso">
            <p className="text-xs font-medium text-gray-dark flex items-center gap-x-1">
              Đánh giá:{" "}
              <span className="rounded-md px-1 py-[1px] flex items-center justify-between text-white bg-second text-[10px] gap-x-[1px]">
                {item[stars] ? item[stars] : 5} <i class="ri-star-fill"></i>
              </span>{" "}
              <span className="font-thin text-xs">
                (
                {item[reviews]
                  ? item[reviews]
                  : Math.round(Math.random() * 1000)}
                )
              </span>
            </p>

            <p className="text-xs font-medium text-gray-dark flex items-center gap-x-1">
              Đã bán:{" "}
              <span className="font-thin text-xs">
                {item[sold] ? item[sold] : Math.round(Math.random() * 100)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        title="Thêm vào giỏ hàng"
        disabled={disableAction}
        onClick={(e) => {
          e.stopPropagation();
          handleAddProductToCart(e);
        }}
        className={`absolute  bottom-3 right-3 w-10 h-8 rounded-md bg-second disabled:bg-gray-300
               flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-200`}
      >
        <i class="ri-shopping-cart-line text-white"></i>
      </button>
    </div>
  );
};

export default ProductCard;
