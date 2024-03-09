import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDetailOrder } from "../../redux/reducer/popupReducer";
import LoadingView from "@components/LoadingView";
import Asus from "@assets/img/asus.jpg";
const DetailOrder = () => {
  const dispatch = useDispatch();
  const [detailOrderData, setDetailOrderData] = useState(null);
  const { showDetailOrder } = useSelector((state) => state.popup);
  const { orderDetail, isLoadingOrder } = useSelector((state) => state.order);
  const closeScreen = () => {
    dispatch(closeDetailOrder());
  };
  return (
    <div
      className={`${
        showDetailOrder.open ? "visible" : "invisible"
      } fixed top-0 right-0 w-screen h-screen z-50 flex justify-center delay-100`}
    >
      <div
        className="bg-black opacity-20 w-full h-full absolute"
        onClick={closeScreen}
      ></div>
      <div
        className={`w-[800px] bg-white rounded-md shadow-sm z-50 mt-20 -translate-y-[120%] ${
          showDetailOrder.open && "!translate-y-0"
        } transition-transform duration-300 h-fit overflow-hidden`}
      >
        <h5 className="text-xl font-medium py-2 px-5 bg-second text-white border-b border-gray-100">
          Chi tiết đơn hàng{" "}
          <span className="font-light">
            #{isLoadingOrder ? "..." : orderDetail?.ODERCODE}
          </span>
        </h5>
        <div className="p-5 min-h-36 max-h-[600px] overflow-y-scroll">
          {isLoadingOrder ? (
            <LoadingView></LoadingView>
          ) : (
            <>
              <div className="mb-10">
                <h5 className="text-gray-dark mx-auto block text-center mb-5 text-sm">
                  <span className="font-medium"> Trạng thái đơn hàng:</span>{" "}
                  Đang giao hàng
                </h5>
                <div>
                  <div className="flex items-center px-16">
                    <div className="size-16 border border-first bg-first rounded-full flex items-center justify-center">
                      <i class="ri-survey-line text-xl text-white"></i>
                    </div>
                    <div className="flex-auto h-1 border border-first bg-first border-x-0"></div>
                    <div className="size-16 border border-first bg-first rounded-full flex items-center justify-center">
                      <i class="ri-box-3-line text-xl text-white"></i>
                    </div>
                    <div className="flex-auto h-1 border border-first bg-first border-x-0"></div>
                    <div className="size-16 border-4 border-[#ffa25b] bg-first rounded-full flex items-center justify-center">
                      <i class="ri-caravan-fill text-xl text-white"></i>
                    </div>
                    <div className="flex-auto h-1 border border-gray-light border-x-0"></div>
                    <div className="size-16 border border-gray-light rounded-full flex items-center justify-center">
                      <i class="ri-check-line text-xl text-gray-light"></i>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 mt-2">
                    <div className="flex flex-col items-center">
                      <h5 className="text-sm text-gray-dark w-28 text-center">
                        Xác nhận đơn hàng
                      </h5>
                      <span className="text-xs text-gray-light">
                        12/02/2024
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <h5 className="text-sm text-gray-dark w-28 text-center">
                        Đóng gói đơn hàng
                      </h5>
                      <span className="text-xs text-gray-light">
                        12/02/2024
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <h5 className="text-sm text-gray-dark w-28 text-center">
                        Đang giao hàng
                      </h5>
                      <span className="text-xs text-gray-light">
                        12/02/2024
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <h5 className="text-sm text-gray-dark w-28 text-center">
                        Đơn hàng đã giao
                      </h5>
                      <span className="text-xs text-gray-light">
                        12/02/2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2 mb-3">
                <h5 className="text-gray-dark text-base font-medium mb-1">
                  {" "}
                  <i class="ri-map-pin-line text-base"></i> Địa chỉ giao hàng:
                </h5>
                <div className="flex text-gray-dark text-sm gap-x-2 ml-10">
                  <div className="flex flex-col gap-y-1">
                    <p>
                      <span>Địa chỉ: </span>
                      {orderDetail?.DLVRADDR}
                    </p>
                    <p>
                      <span>SĐT người nhận: </span>
                      {orderDetail?.RCVR_TEL}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h5 className="text-gray-dark text-base font-medium mb-1">
                  {" "}
                  <i class="ri-box-3-line text-base"></i> Danh sách sản phẩm:
                </h5>
                <div className="flex text-gray-dark text-sm gap-x-2 ml-10">
                  <div className="flex flex-col gap-y-1 w-full">
                    {orderDetail?.DETAIL?.map((item) => {
                      return (
                        <div className="flex gap-x-2 border-b border-gray-100 py-2">
                          <div>
                            <img
                              src={Asus}
                              alt=""
                              className="size-16 object-contain object-center"
                            />
                          </div>
                          <div className="flex items-start justify-between flex-auto">
                            <div>
                              <p>{item?.PRDCNAME}</p>
                              <p>
                                <span>Loại hàng:</span> RAM 64GB
                              </p>
                              <p>x{item?.PRDCQTTY}</p>
                            </div>
                            <div className="text-second font-light">
                              {item?.MNEYAMNT?.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}{" "}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="py-2 ml-auto border-b text-gray-dark border-gray-100 w-72 flex justify-between font-light">
                    <span>
                      <i class="ri-money-dollar-circle-line"></i> Thuế(VAT):
                    </span>
                    <span className="text-second">
                      +
                      {orderDetail?.VAT_CRAM?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </span>
                  </div>
                  <div className="py-2 ml-auto border-b text-gray-dark border-gray-100 w-72 flex justify-between font-light">
                    <span>
                      <i class="ri-money-dollar-circle-line"></i> Giao hàng:
                    </span>
                    <span className="text-second">
                      +
                      {orderDetail?.SUM_AMNT?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="py-2 ml-auto border-b text-gray-dark border-gray-100 w-72 flex justify-between font-light">
                    <span>
                      <i class="ri-money-dollar-circle-line"></i> Giảm giá từ
                      voucher:
                    </span>
                    <span className="text-second">
                      -
                      {orderDetail?.SUM_AMNT?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="py-2 ml-auto border-b text-gray-dark border-gray-100 w-72 flex justify-between font-light">
                    <span>
                      <i class="ri-money-dollar-circle-line"></i> Thành tiền:
                    </span>
                    <span className="text-second">
                      {orderDetail?.SUM_AMNT?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="bg-gray-200 text-gray-dark py-2 px-6 text-sm">
          <span>
            <i class="ri-bank-card-line"></i> Phương thức thanh toán:{" "}
          </span>
          Thanh toán khi nhận hàng
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
