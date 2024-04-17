import React from "react";
import { useDispatch } from "react-redux";
import { openEvaluateProduct } from "../../redux/reducer/popupReducer";
const Notifycation = () => {
  const dispatch = useDispatch();
  const openEvaluate = () => {
    dispatch(openEvaluateProduct({ productID: "00056" }));
  };
  return (
    <div className="group/notify  flex items-center justify-center gap-x-1 text-gray relative text-sm cursor-pointer">
      <i className="ri-notification-line text-xl relative">
        <div className="absolute -top-2 -right-3 bg-second w-5 h-5 text-[12px] text-white rounded-full flex items-center justify-center">
          {7}
        </div>
      </i>
      <span className="hidden md:block">Thông báo</span>

      <div className="hidden lg:rounded-md lg:border-gray-200 lg:border group-hover/notify:block absolute bg-white top-[150%] -right-[30%] w-96 flex-col gap-y-2 shadow-md rounded-sm border-t z-50 after:absolute after:h-5 after:contents-[''] after:w-1/2 after:bg-transparent after:-top-[5%] after:right-0">
        <div className="flex flex-col">
          <h5 className="p-3 pb-1">Thông báo mới</h5>
          <div className="flex flex-col gap-y-2 px-3">
            <div
              className="flex gap-x-2 items-start border-b py-2"
              onClick={openEvaluate}
            >
              {/* <div className=" flex-grow"> */}
              <img
                src="https://picsum.photos/id/237/300/300"
                className="size-20 object-cover object-center"
                alt=""
              />
              {/* </div> */}
              <div className=" flex flex-col gap-y-1">
                <h5 className="text-xs font-bold text-gray-dark line-clamp-1">
                  Chương trình khuyến mãi đặc biệt
                </h5>
                <p className="text-xs line-clamp-2">
                  Chương trình đặc biệt dành cho 10 khách hàng đầu tiên trong
                  tháng 11
                </p>
                <button className="text-[11px] text-gray-dark border w-fit px-3 group/translate hover:bg-second hover:border-second hover:text-white">
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div
              className="flex gap-x-2 items-start border-b py-2"
              onClick={openEvaluate}
            >
              {/* <div className=" flex-grow"> */}
              <img
                src="https://picsum.photos/id/237/300/300"
                className="size-20 object-cover object-center"
                alt=""
              />
              {/* </div> */}
              <div className=" flex flex-col gap-y-1">
                <h5 className="text-xs font-bold text-gray-dark line-clamp-1">
                  Chương trình khuyến mãi đặc biệt
                </h5>
                <p className="text-xs line-clamp-2">
                  Chương trình đặc biệt dành cho 10 khách hàng đầu tiên trong
                  tháng 11
                </p>
                <button className="text-[11px] text-gray-dark border w-fit px-3 group/translate hover:bg-second hover:border-second hover:text-white">
                  Đánh giá
                </button>
              </div>
            </div>
          </div>
          <button className="bg-gray-100 py-2 hover:opacity-40 transition-opacity duration-150 text-sm">
            Xem thêm...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifycation;
