import React from "react";
import Triangle from "../../assets/img/triangle.png";
import { useDispatch } from "react-redux";
// import { openEvaluateProduct } from "../../redux/reducer/popupReducer";
const Notifycation = () => {
  const dispatch = useDispatch();
  const openEvaluate = () => {
    dispatch(openEvaluateProduct({ productID: "00056" }));
  };
  return (
    <div className="group/notify  flex items-center justify-center gap-x-1 text-slate-700 relative text-sm cursor-pointer">
      <div className="relative">
        <i className="ri-notification-line text-xl"></i>
        <div className="absolute -top-3 -right-3 bg-second w-5 h-5 text-[11px] text-white rounded-full flex items-center justify-center">
          {7}
        </div>
      </div>
      <span className="hidden md:block">Thông báo</span>
      <div className="lg:rounded-lg invisible lg:opacity-0 lg:border-gray-200 lg:border  lg:group-hover/notify:visible lg:group-hover/notify:opacity-100 duration-300 transition-opacityVisibility absolute bg-white top-[120%] -right-[10%] w-96 flex-col gap-y-2 shadow-md rounded-sm border-t z-50 after:absolute after:h-5 after:contents-[''] after:w-1/2 after:bg-transparent after:-top-[5%] after:right-0">
        <div className="absolute -top-2 right-10">
          <img src={Triangle} className="w-4 h-2" alt="" />
        </div>
        <div className="flex flex-col">
          <h5 className="p-3 pb-1 text-slate-700 text-base">Thông báo mới</h5>
          <div className="flex flex-col gap-y-2 px-3">
            <div
              className="flex gap-x-2 items-start border-b py-2"
              onClick={openEvaluate}
            >
              <img
                src="https://picsum.photos/id/237/300/300"
                className="size-20 object-cover object-center rounded-md"
                alt=""
              />
              <div className=" flex flex-col gap-y-1">
                <h5 className="text-xs font-bold text-slate-700 line-clamp-1">
                  Chương trình khuyến mãi đặc biệt
                </h5>
                <p className="text-xs line-clamp-2 italic text-slate-400 font-thin">
                  Chương trình đặc biệt dành cho 10 khách hàng đầu tiên trong
                  tháng 11
                </p>
                <button className="text-[11px] rounded-md text-gray-dark border w-fit px-3 group/translate hover:bg-second hover:border-second hover:text-white">
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div
              className="flex gap-x-2 items-start py-2"
              onClick={openEvaluate}
            >
              <img
                src="https://picsum.photos/id/237/300/300"
                className="size-20 object-cover object-center rounded-md"
                alt=""
              />
              <div className=" flex flex-col gap-y-1">
                <h5 className="text-xs font-bold text-slate-700 line-clamp-1">
                  Đánh giá sản phẩm "Tấm Trần PIMA"
                </h5>
                <p className="text-xs line-clamp-2 italic text-slate-400 font-thin">
                  Vui lòng đánh giá về sản phẩm, chất lượng dịch vụ.
                </p>
                <button className="text-[11px] rounded-md text-gray-dark border w-fit px-3 group/translate hover:bg-second hover:border-second hover:text-white">
                  Đánh giá
                </button>
              </div>
            </div>
          </div>
          <button className="bg-slate-200 py-2 hover:opacity-40 transition-opacity duration-150 text-sm text-slate-700">
            Xem thêm...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifycation;
