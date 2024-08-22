import React, { useEffect, useState } from "react";
import ImageFetch from "../ImageFetch";
import ProductSuggestion from "../productsuggestion/ProductSuggestion";
import { useDispatch, useSelector } from "react-redux";
import { closeBlock, openBlock } from "../../redux/reducer/popupReducer";
import { chooseProduct } from "../../redux/reducer/cartReducer";
import {
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "../../redux/query/cartQuery";

const RowPayDetail = ({
  item,
  name,
  id,
  image,
  price,
  choose,
  saleoff,
  total,
  quantity,
  maincode,
  handleChangeAmount,
  handleChoose,
}) => {
  const [
    updateCart,
    {
      data: updateCartData,
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
    },
  ] = useUpdateCartMutation();
  const [
    deleteCart,
    {
      data: deleteCartData,
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
    },
  ] = useDeleteCartMutation();
  const [disabled, setDisabled] = useState(false);
  const [notifyDelete, setNotifyDelete] = useState(false);
  const { productCarts, actionCart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [qty, setQty] = useState(item[quantity]);
  const dispatch = useDispatch();
  const closeNotify = () => {
    dispatch(closeBlock());
    setNotifyDelete(false);
  };

  const handlePlus = async (id) => {
    setDisabled(true);
    const productFind = productCarts.find((item) => item.PRDCCODE == id);
    const body = {
      DCMNCODE: "APPCARTPRDC",
      HEADER: [
        {
          ...productFind,
          QUOMQTTY: productFind.QUOMQTTY + 1,
          USERLOGIN: currentUser?.USERLGIN,
          PRDCIMAGE: productFind.PRDCIMAGE,
        },
      ],
    };
    await updateCart(body);
  };
  useEffect(() => {
    setQty(item[quantity]);
  }, [item[quantity]]);

  const handleDeleteProduct = (prdcCode, id) => {
    deleteCart({ PRDCCODE: prdcCode, id: id });
  };

  const handleBlurAmount = async (e, id) => {
    setDisabled(true);
    const productFind = productCarts.find((item) => item.PRDCCODE == id);
    if (parseInt(e.target.value) == 0) {
      let result = productCarts.filter(
        (item) => item.PRDCCODE != productFind.PRDCCODE
      );
      formik.values.DETAIL = result;
      handleDeleteProduct(productFind.PRDCCODE, productFind.KKKK0000);
    } else {
      const body = {
        DCMNCODE: "APPCARTPRDC",
        HEADER: [
          {
            ...productFind,
            QUOMQTTY: parseInt(e.target.value),
            USERLOGIN: currentUser?.USERLGIN,
            PRDCIMAGE: productFind.PRDCIMAGE,
          },
        ],
      };
      console.log(currentUser);
      await updateCart(body);
    }
  };

  const openNotify = () => {
    dispatch(openBlock());
    setNotifyDelete(true);
  };

  const notifyHandleSubtract = async (value) => {
    console.log(value);
    if (item[quantity] == 1) {
      dispatch(openBlock());
      setNotifyDelete(true);
      return;
    }
    setDisabled(true);
    const productFind = productCarts.find((item) => item.PRDCCODE == value);
    const body = {
      DCMNCODE: "APPCARTPRDC",
      HEADER: [
        {
          ...productFind,
          QUOMQTTY: productFind.QUOMQTTY - 1,
          USERLOGIN: currentUser?.USERLGIN,
          PRDCIMAGE: productFind.PRDCIMAGE,
        },
      ],
    };
    await updateCart(body);
  };

  const handleChangeChoose = (id) => {
    dispatch(chooseProduct({ id: id }));
  };

  useEffect(() => {
    if (!isLoadingUpdate) {
      dispatch(closeBlock());
      setNotifyDelete(false);
      setDisabled(false);
    }
  }, [isLoadingUpdate]);

  return (
    <>
      <div
        className={`${
          notifyDelete ? "visible opacity-100" : "invisible opacity-0"
        } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-5 z-50 flex justify-center items-center transition-opacityVisibility`}
      >
        <div className="bg-white shadow-md rounded-md w-80 py-10 px-5 text-center">
          Bạn chắc chắn xóa sản phẩm{" "}
          <span className="font-semibold">{item[name]}</span>
          <div className="flex gap-x-2 justify-center mt-5">
            <button
              type="button"
              className="py-2 px-4 bg-second text-white"
              onClick={() => {
                handleDeleteProduct(item[id], item[maincode]);
              }}
            >
              {disabled ? (
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
                "Xác nhận"
              )}
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-red-500 text-white"
              onClick={closeNotify}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
      <tr
        key={id}
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <td
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="flex items-center gap-x-2 w-fit">
            <input
              id={item[id]}
              readOnly
              type="checkbox"
              className="w-4 h-4 accent-first border-gray-light"
              checked={item[choose]}
              onClick={() => handleChangeChoose(item[id])}
            />
            <label
              htmlFor={item[id]}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              <div className="border border-gray-300 rounded-xl overflow-hidden shadow-lg">
                <ImageFetch
                  url={item[image]}
                  className={"!size-20"}
                ></ImageFetch>
              </div>
              <span className="text-gray-dark text-wrap lg:w-60 line-clamp-2 w-0 font-bold">
                {item[name]}
              </span>
            </label>
          </div>
        </td>
        <td class="px-6 py-4">
          <div>
            <div className="flex items-center w-fit gap-x-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => notifyHandleSubtract(item[id])}
                className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark disabled:bg-slate-100"
              >
                -
              </button>
              <input
                disabled={disabled}
                type="number"
                min={1}
                onBlur={(e) => {
                  handleBlurAmount(e, item[id]);
                }}
                id={item[id]}
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                className="border pl-2 w-14 h-6 rounded-md  outline-none text-xs text-gray-dark disabled:bg-slate-100"
              />
              <button
                disabled={disabled}
                type="button"
                onClick={() => {
                  setDisabled(true);
                  handlePlus(item[id]);
                }}
                className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark disabled:bg-slate-100"
              >
                +
              </button>
            </div>
            {/* <div>{item[]}</div> */}
          </div>
        </td>
        <td class="px-6 py-4">
          <div className="font-semibold">
            {item[price]?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </td>
        <td class="px-6 py-4 font-bold">
          {item[saleoff]}%(-
          {((item[price] * item[saleoff]) / 100)?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
          )
        </td>
        <td class="px-6 py-4">
          <div className="font-semibold">
            {(
              item[price] * item[quantity] -
              (item[price] * item[quantity] * item[saleoff]) / 100
            )?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}{" "}
          </div>
        </td>
        <td class="px-6 py-4">
          <div className="flex flex-col items-center gap-y-2 relative">
            <button
              disabled={disabled}
              type="button"
              className="text-white bg-red-400 w-fit px-7 py-2 rounded-md text-xs cursor-pointer disabled:bg-gray-400"
              onClick={openNotify}
            >
              Xóa
            </button>

            <ProductSuggestion
              keyword={item[name]?.substring(0, item[name]?.length - 8)}
            ></ProductSuggestion>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RowPayDetail;
