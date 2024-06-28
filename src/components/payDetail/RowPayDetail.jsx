import React, { useEffect, useState } from "react";
import ImageFetch from "../ImageFetch";
import ProductSuggestion from "../productsuggestion/ProductSuggestion";
import { useDispatch } from "react-redux";
import { closeBlock, openBlock } from "../../redux/reducer/popupReducer";

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
  handlePlus,
  handleDelete,
  handleBlurAmount,
  handleChangeAmount,
  handleSubstract,
  handleChoose,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [notifyDelete, setNotifyDelete] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, [disabled == true]);

  const closeNotify = () => {
    dispatch(closeBlock());
    setNotifyDelete(false);
  };

  const openNotify = () => {
    dispatch(openBlock());
    setNotifyDelete(true);
  };

  const notifyHandleSubtract = () => {
    if (item[quantity] == 1) {
      dispatch(openBlock());
      setNotifyDelete(true);
      return;
    }
    setDisabled(true);
    handleSubstract(item[id]);
  };
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
                handleDelete(item[id], item[maincode]);
                closeNotify();
              }}
            >
              Xác nhận
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
              onClick={() => handleChoose(item[id])}
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
                onClick={() => notifyHandleSubtract()}
                className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark disabled:bg-slate-100"
              >
                -
              </button>
              <input
                disabled={disabled}
                type="number"
                min={1}
                onBlur={(e) => {
                  setDisabled(true);
                  handleBlurAmount(e, item[id]);
                }}
                id={item[id]}
                value={item[quantity]}
                onChange={(e) => {
                  handleChangeAmount(e, item[id]);
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
              keyword={item[name]?.substring(0, 10)}
            ></ProductSuggestion>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RowPayDetail;
