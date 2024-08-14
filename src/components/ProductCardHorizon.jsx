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
  const { productCarts, actionCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddProductToCart = (value) => {
    event.preventDefault();
    setDisableAction(true);
    if (currentUser !== null) {
      console.log(item[id]);

      const findProduct = productCarts?.find((item) => {
        return item?.PRDCCODE == value;
      });
      console.log(findProduct);

      if (findProduct != null) {
        toast.warning("Sản phẩm đã có trong giỏ hàng!", {
          autoClose: 1500,
          position: "top-center",
          hideProgressBar: true,
        });
        return;
      }
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
    setDisableAction(false);
  }, [actionCart.isLoading == false]);
  return (
    <div
      onClick={() => {
        window.scroll(0, 0);
        navigate(`/products/${item[id]}`);
      }}
      className={`group/product cursor-pointer relative bg-white shadow-sm w-full rounded-lg border overflow-hidden h-48 border-gray-200 flex flex-row items-start`}
    >
      <div className="relative w-96 h-full mb-3 overflow-hidden">
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
      </div>
      {item[discount] > 0 && (
        <div className="absolute left-0 right-0 w-10 text-xs p-1 bg-red-600 text-white rounded-br-lg">
          -{item[discount]}%
        </div>
      )}
      <div className="flex flex-col gap-y-1 w-full px-5 pb-8 pt-4">
        <h5
          className="line-clamp-2 font-semibold text-base text-gray-600"
          title={item[name]}
        >
          {item[name]}({item[unit]})
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
          handleAddProductToCart(item[id]);
        }}
        className={`absolute  bottom-3 right-3 w-10 h-8 rounded-md bg-second disabled:bg-gray-200
               flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-200`}
      >
        {disableAction ? (
          <svg
            aria-hidden="true"
            class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <i class="ri-shopping-cart-line text-white"></i>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
