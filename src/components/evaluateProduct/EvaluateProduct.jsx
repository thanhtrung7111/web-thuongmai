import React, { useEffect, useState } from "react";
import Asus from "../../assets/img/asus.jpg";
import { useDispatch, useSelector } from "react-redux";
import { closeEvaluateProduct } from "../../redux/reducer/popupReducer";
const EvaluateProduct = () => {
  const dispatch = useDispatch();
  const [star, setStar] = useState(5);
  const { showEvaluateProduct } = useSelector((state) => state.popup);
  const changeStar = (item) => {
    setStar(item);
  };

  const closeEvaluate = () => {
    dispatch(closeEvaluateProduct());
  };
  useEffect(() => {
    console.log(showEvaluateProduct.productID);
  }, [showEvaluateProduct.productID]);
  return (
    <div
      className={`fixed top-0 right-0 w-screen h-screen z-[100] flex justify-center ${
        showEvaluateProduct.open ? "visible" : "invisible"
      } delay-100`}
    >
      <div
        className="bg-black bg-opacity-10 absolute w-full h-full"
        onClick={closeEvaluate}
      ></div>

      <div
        className={`py-5 px-5 bg-white z-50 rounded-md shadow-sm mt-20 h-fit shadow-gray-dark border-t w-[600px] -translate-y-[120%] ${
          showEvaluateProduct.open && "translate-y-0"
        } transition-transform duration-300`}
      >
        <div className="absolute top-0 right-0 text-gray-darked">
          <i className="ri-ri-close-circle-line"></i>
        </div>
        <h3 className="text-gray-dark font-medium text-2xl mb-5">
          Đánh giá sản phẩm
        </h3>
        <div className="px-4">
          <div className="flex gap-x-3 mb-3">
            <img
              src={Asus}
              alt=""
              className="size-20 object-contain object-center border p-1"
            />
            <p className="text-gray-dark flex-auto text-base">
              Sản phẩm assus độc quyền
            </p>
          </div>

          <div className="mb-3 flex flex-col gap-x-5">
            <h5 className="text-gray-dark font-medium text-base mb-1">
              Chất lượng sản phẩm
            </h5>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-1">
                {[...Array(5).map((i, index) => index)].map((item, index) => {
                  console.log(index);
                  if (index + 1 <= star) {
                    return (
                      <i
                        key={index}
                        className="ri-star-fill text-yellow-400 text-3xl cursor-pointer"
                        onClick={() => changeStar(index + 1)}
                      ></i>
                    );
                  }

                  return (
                    <i
                      key={index}
                      className="ri-star-line text-yellow-400 text-3xl cursor-pointer"
                      onClick={() => changeStar(index + 1)}
                    ></i>
                  );
                })}
              </div>

              <div
                className={`text-sm ${
                  star >= 4
                    ? "text-yellow-400"
                    : star < 3
                    ? "text-red-400"
                    : "text-gray-dark"
                }`}
              >
                {star == 1
                  ? "Tệ"
                  : star == 2
                  ? "Kém"
                  : star == 3
                  ? "Bình thường"
                  : star == 4
                  ? "Tốt"
                  : "Tuyệt vời"}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Ý kiến của bạn"
              className="text-sm border w-full p-2 outline-none text-gray-dark"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="text-white bg-second hover:opacity-90 text-sm py-1 px-3 rounded-sm">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluateProduct;
