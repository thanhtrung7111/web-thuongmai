import React, { useEffect, useState } from "react";
import SubMenu from "./SubMenu";
import Phone from "../../assets/img/phone.png";
import QrCode from "../../assets/img/qr-code.png";
import IconVN from "../../assets/img/icon-vn.png";
import Triangle from "../../assets/img/triangle.png";
import Apple from "../../assets/img/appple.png";
import Android from "../../assets/img/android.png";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../redux/reducer/popupReducer";
const data = [
  {
    name: "Danh mục",
    icon: <i class="ri-list-check"></i>,
    link: "/products",
    listItem: [
      {
        name: "Máy tính",
        link: "/products",
        listItem: [
          {
            name: "Máy tính asus",
            listItem: [
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
              { name: "Loại A" },
            ],
          },
          { name: "Máy tính Lenovo" },
        ],
      },
    ],
  },
  {
    name: "Khuyến mãi",
    link: "/promotion",
  },
  {
    name: "Sản phẩm",
    link: "/products",
  },
];
const MenuChild = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const dispatch = useDispatch();
  const handleOpenShowMenu = () => {
    document.getElementById("menu-child").classList.add("show-men-child");
    dispatch(openBlock());
    setOpenOverlay(true);
  };

  const handleCloseShowMenu = () => {
    document.getElementById("menu-child").classList.remove("show-men-child");
    setOpenOverlay(false);
    dispatch(closePopup());
  };

  const closeOverlay = () => {
    dispatch(closePopup());
    document.getElementById("menu-child").classList.remove("show-men-child");
    setOpenOverlay(false);
  };

  //   useEffect(() => {
  //     setOpenOverlay(false);
  //   }, [block == false]);
  return (
    <>
      <div
        className={`fixed top-0 right-0 ${
          openOverlay ? "block" : "hidden"
        } bg-black bg-opacity-20 w-screen h-screen z-[100] lg:hidden`}
        onClick={closeOverlay}
      ></div>
      <div className="shadow-md py-2 border-b bg-[#ff8c4a]">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div className="flex gap-x-4">
            <div
              className="text-white cursor-pointer lg:hidden"
              onClick={handleOpenShowMenu}
            >
              <i class="ri-list-check"></i>
            </div>
            <div
              id="menu-child"
              className="overflow-scroll flex flex-col fixed top-0 h-full w-80 bg-white  z-40 items-center gap-0 pt-10 shadow-md -left-full transition-[left]  lg:overflow-visible lg:w-full lg:z-20 lg:left-0 lg:shadow-none lg:py-0 lg:bg-transparent  lg:flex-row lg:relative"
            >
              <div
                onClick={handleCloseShowMenu}
                className="absolute top-1 -right-1 cursor-pointer text-lg px-3 lg:hidden text-gray-dark hover:-translate-x-2 transition-transform hover:text-second"
              >
                <i class="ri-arrow-left-double-line text-2xl"></i>
              </div>

              <div className="flex items-center gap-x-5">
                <div className="text-white flex gap-x-1 items-center cursor-pointer">
                  <i className="ri-store-2-line"></i>
                  <span className="text-xs">Hệ thống cửa hàng</span>
                </div>
                <div className="text-white flex gap-x-1 items-center cursor-pointer">
                  <i className="ri-headphone-line"></i>
                  <span className="text-xs">Hotline: 1900 5252</span>
                </div>{" "}
                <div className="text-white flex gap-x-1 items-center cursor-pointer">
                  <i className="ri-discount-percent-line"></i>
                  <span className="text-xs">Tin tức và Khuyến mãi</span>
                </div>{" "}
                <div className="text-white flex gap-x-1 items-center cursor-pointer">
                  <i className="ri-file-search-line"></i>
                  <span className="text-xs">Tra cứu đơn hàng</span>
                </div>
              </div>
              {/* {data.map((item) => (
                <SubMenu
                  key={item[name]}
                  link={item.link}
                  name={item.name}
                  listItem={item.listItem}
                  icon={item.icon}
                  level={1}
                  handleCloseMenu={handleCloseShowMenu}
                ></SubMenu>
              ))} */}
            </div>
          </div>

          <div className="flex items-center gap-x-3 ">
            <div
              href="#"
              className="group/download relative flex items-center gap-x-1 text-white w-fit cursor-pointer transition-colors duration-150 pr-3 border-r"
            >
              <img src={Phone} alt="" className="w-5" />
              <span className="text-xs font-medium">Tải ứng dụng</span>

              <div className="absolute  border border-gray-200 rounded-md invisible opacity-0 group-hover/download:visible group-hover/download:opacity-100 transition-opacityVisibility z-50 top-[130%] -right-2 bg-white w-72 shadow-sm border-t px-4 py-8 text-center before:absolute before:w-full before:h-5 before:bg-transparent before:-top-4 before:right-0">
                <div className="absolute -top-2 right-14 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                <h4 className="font-medium text-gray-dark mb-3 text-sm">
                  Quét QR để tải ứng dụng
                </h4>
                <div className="flex items-center justify-centern">
                  <img src={QrCode} alt="" className="w-28" />

                  <div className="w-full flex flex-col gap-y-2">
                    <button className="flex text-gray-light border  px-3 py-2 rounded-md w-full items-center justify-center text-sm">
                      <img src={Android} alt="" className="w-5" />
                      Apple
                    </button>
                    <button className="flex text-gray-light border  px-3 py-2 rounded-md w-full items-center justify-center gap-x-1 text-sm">
                      <img src={Apple} alt="" className="w-5" />
                      Android
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              href="#"
              className="flex items-center gap-x-2 text-white w-fit cursor-pointer transition-colors duration-150"
            >
              <span className="text-xs font-medium flex items-center gap-x-2">
                <img src={IconVN} alt="" className="w-6" />
                Tiếng Việt
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuChild;
