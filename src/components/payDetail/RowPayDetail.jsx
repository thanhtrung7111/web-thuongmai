import React, { useEffect, useState } from "react";
import ImageFetch from "../ImageFetch";
import ProductSuggestion from "../productsuggestion/ProductSuggestion";
import { useDispatch, useSelector } from "react-redux";
// import { closePopup, openPopup } from "../../redux/reducer/popupReducer";
import { chooseProduct } from "../../redux/reducer/cartReducer";
import {
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "../../redux/query/cartQuery";
import ButtonForm from "../commonForm/ButtonForm";
import { closePopup, openPopup } from "../../redux/reducer/popupReducer";

const RowPayDetail = ({
  item,
  name,
  id,
  image,
  price,
  choose,
  saleoff,
  quantity,
  maincode,
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
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteCartMutation();
  const [notifyDelete, setNotifyDelete] = useState(false);
  const { productCarts, actionCart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [qty, setQty] = useState(item[quantity]);
  const [openSuggest, setOpenSuggest] = useState(false);
  const dispatch = useDispatch();
  const closeNotify = () => {
    dispatch(closePopup());
    setNotifyDelete(false);
  };

  const handlePlus = async (id) => {
    const productFind = productCarts.find((item) => item.PRDCCODE == id);
    const body = {
      ...productFind,
      QUOMQTTY: productFind.QUOMQTTY + 1,
      USERLOGIN: currentUser?.USERLGIN,
      PRDCIMAGE: productFind.PRDCIMAGE,
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
    const productFind = productCarts.find((item) => item.PRDCCODE == id);
    if (parseInt(e.target.value) == 0) {
      let result = productCarts.filter(
        (item) => item.PRDCCODE != productFind.PRDCCODE
      );
      formik.values.DETAIL = result;
      handleDeleteProduct(productFind.PRDCCODE, productFind.KKKK0000);
    } else {
      const body = {
        ...productFind,
        QUOMQTTY: parseInt(e.target.value),
        USERLOGIN: currentUser?.USERLGIN,
        PRDCIMAGE: productFind.PRDCIMAGE,
      };
      console.log(body);
      console.log(currentUser);
      await updateCart(body);
    }
  };

  const openNotify = () => {
    dispatch(openPopup());
    setNotifyDelete(true);
  };

  const notifyHandleSubtract = async (value) => {
    console.log(value);
    if (item[quantity] == 1) {
      dispatch(openPopup());
      setNotifyDelete(true);
      return;
    }
    const productFind = productCarts.find((item) => item.PRDCCODE == value);
    const body = {
      ...productFind,
      QUOMQTTY: productFind.QUOMQTTY - 1,
      USERLOGIN: currentUser?.USERLGIN,
      PRDCIMAGE: productFind.PRDCIMAGE,
    };
    await updateCart(body);
  };

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(closePopup());
    }
  }, [isSuccessDelete]);

  return (
    <>
      <div
        className={`${
          notifyDelete ? "visible opacity-100" : "invisible opacity-0"
        } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-5 z-50 flex justify-center items-center transition-opacityVisibility`}
      >
        <div className="bg-white shadow-md rounded-md w-80 py-10 px-5 text-center">
          Bạn chắc chắn xóa sản phẩm{" "}
          <span className="font-semibold">{item[name]}?</span>
          <div className="flex gap-x-2 justify-center mt-5">
            <ButtonForm
              type="button"
              className="!w-28  !px-6"
              onClick={() => {
                handleDeleteProduct(item[id], item[maincode]);
              }}
              label={"Xác nhận"}
              loading={isLoadingDelete}
            ></ButtonForm>

            <ButtonForm
              disabled={isLoadingDelete}
              type="button"
              className="!w-fit !bg-red-500 !px-6"
              onClick={closeNotify}
              label={"Hủy"}
            ></ButtonForm>
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
              onClick={() => handleChoose(item[id])}
            />
            <label
              htmlFor={item[id]}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              <div className="border border-gray-300 overflow-hidden shadow-lg">
                <ImageFetch
                  url={item[image]}
                  className={"!size-20"}
                  id={item[id]}
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
            <div className="flex items-center w-fit">
              <ButtonForm
                type="button"
                disabled={isLoadingUpdate}
                label={"-"}
                className="!w-7 !h-7 bg-slate-500"
                onClick={() => notifyHandleSubtract(item[id])}
              ></ButtonForm>
              <input
                disabled={isLoadingUpdate}
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
                className="border h-7 w-14 text-center pl-2 outline-none text-xs text-gray-dark disabled:bg-slate-100"
              />
              <ButtonForm
                type="button"
                disabled={isLoadingUpdate}
                label={"+"}
                className="!w-7 !h-7 bg-slate-500"
                onClick={() => {
                  handlePlus(item[id]);
                }}
              ></ButtonForm>
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
        <td class="px-6 py-4 w-16">
          <div className="flex flex-col items-center gap-y-2 relative">
            <ButtonForm
              loading={isLoadingDelete}
              type="button"
              className="!bg-red-600 !w-24 px-7 py-2 text-xs cursor-pointer disabled:bg-gray-400"
              onClick={openNotify}
              label={"Xóa"}
            ></ButtonForm>
            <span
              className="cursor-pointer text-center"
              onClick={() => setOpenSuggest(!openSuggest)}
            >
              Tìm sản phẩm liên quan?
            </span>
            <ProductSuggestion
              open={openSuggest}
              onClose={() => setOpenSuggest(false)}
              keyword={item[name]?.substring(0, item[name]?.length - 8)}
            ></ProductSuggestion>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RowPayDetail;
