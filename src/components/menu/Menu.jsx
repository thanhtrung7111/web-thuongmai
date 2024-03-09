import React, { useEffect, useState } from "react";
import Logo from "@assets/img/Icon.png";
import Phone from "@assets/img/phone.png";
import QrCode from "@assets/img/qr-code.png";
import Apple from "@assets/img/appple.png";
import Android from "@assets/img/android.png";
import { NavLink, useNavigate } from "react-router-dom";
import SmallCard from "@components/smallCart/SmallCard";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { logout, clearSearch, saveSearch } from "@redux/reducer/userReducer";
import { loadCart } from "@redux/actions/cartAction";
import { clearCart } from "@redux/reducer/cartReducer";
import Notifycation from "@components/notify/Notifycation";
import SearchMenu from "./SearchMenu";
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { productCarts } = useSelector((state) => state.cart);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearSearch());
    navigate("/login");
  };
  useEffect(() => {
    dispatch(loadCart());
    console.log(productCarts);
  }, []);

  return (
    <>
      <div className="py-2 border-b sticky top-0 bg-white z-30 shadow-md">
        <div className="xl:container xl:mx-auto mx-5">
          <div className="flex items-center gap-x-20">
            {/* logo  */}
            <NavLink to={"/"} className="md:w-40 w-32">
              <img src={Logo} alt="" className="w-full" />
            </NavLink>

            <div className="flex  lg:justify-between flex-auto md:gap-x-24 justify-end">
              <SearchMenu></SearchMenu>
              <div className="flex items-center gap-x-4">
                <div className="group/cart relative">
                  <div
                    className="flex items-center justify-center gap-x-1 text-gray cursor-pointer"
                    onClick={() =>
                      document
                        .getElementById("cart-small")
                        .classList.add("show-small-cart")
                    }
                  >
                    <div className="relative">
                      <i className="ri-shopping-cart-line text-sm"></i>
                      <div className="absolute -top-2 -right-3 bg-second w-5 h-5 text-[12px] text-white rounded-full flex items-center justify-center">
                        {productCarts?.length}
                      </div>
                    </div>
                    <span className="text-sm hidden md:block"> Giỏ hàng</span>
                  </div>

                  {/* GIỏ hàng  */}
                  {productCarts ? (
                    <SmallCard
                      data={productCarts}
                      id="id"
                      name="name"
                      amount="quantity"
                      price="price"
                      image="image"
                    ></SmallCard>
                  ) : (
                    ""
                  )}
                </div>
                <div className="group/notify flex items-center justify-center gap-x-1 text-gray relative text-sm cursor-pointer">
                  <i className="ri-notification-line text-sm relative">
                    <div className="absolute -top-2 -right-3 bg-second w-5 h-5 text-[12px] text-white rounded-full flex items-center justify-center">
                      {productCarts?.length}
                    </div>
                  </i>
                  <span className="hidden md:block">Thông báo</span>

                  <Notifycation></Notifycation>
                </div>
                <div className="group/cart flex items-center justify-center gap-x-1 text-gray relative text-sm cursor-pointer">
                  {currentUser ? (
                    <img
                      src="https://picsum.photos/seed/picsum/200/300"
                      alt=""
                      className="size-6 rounded-full object-cover object-center"
                    />
                  ) : (
                    <i className="ri-user-line text-sm"></i>
                  )}
                  <div className="hidden md:block">
                    <div className="flex items-center gap-x-1 max-w-32">
                      {currentUser ? (
                        <span className="line-clamp-1 flex-auto">
                          {currentUser.USERNAME}
                        </span>
                      ) : (
                        <NavLink to={"/login"}>Đăng nhập</NavLink>
                      )}

                      {currentUser && <i className="ri-arrow-down-s-line"></i>}
                    </div>
                  </div>
                  {currentUser && (
                    <div className="invisible group-hover/cart:visible absolute top-[150%] -right-5 bg-white shadow-md border-t border-gray-100 px-5 py-3 w-48 flex flex-col z-50 gap-y-3 before:content-[''] before:w-full before:h-5 before:bg-transparent before:absolute before:-top-[15%] before:left-0">
                      <NavLink
                        to={"/personal?tab=info"}
                        className="text-gray-dark hover:text-second transition-colors duration-200 flex items-center gap-x-1"
                      >
                        <i class="ri-account-pin-box-line text-base"></i> Thông
                        tin cá nhân
                      </NavLink>
                      <NavLink
                        to={"/personal?tab=order"}
                        className="text-gray-dark hover:text-second transition-colors duration-200 flex items-center gap-x-1"
                      >
                        <i class="ri-chat-history-line text-base"></i>Đơn hàng
                      </NavLink>
                      <span
                        onClick={handleLogout}
                        to={"/"}
                        className="text-gray-dark hover:text-second transition-colors duration-200 flex items-center gap-x-1"
                      >
                        <i class="ri-logout-box-line text-base"></i> Đăng xuất
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MENU CON  */}
      <div className="shadow-md py-2 border-b bg-[#ff8c4a]">
        <div className="xl:container xl:mx-auto flex justify-between mx-5">
          <div className="flex gap-x-4">
            <div
              href="#"
              className="group/category relative flex items-center gap-x-2 pr-3 border-r border-gray-200 text-white w-fit cursor-pointer transition-colors duration-150"
            >
              <i className="ri-menu-2-line leading-none"></i>{" "}
              <span className="text-sm font-medium">Danh mục</span>
              <div
                className="invisible group-hover/category:visible 
             absolute top-[140%] left-0 bg-white shadow-md w-52 h-[400px] border-t border-gray-200 before:absolute before:w-full before:h-5 before:-top-4 before:left-0 before:bg-transparent z-50"
              >
                <div className="group/category-item">
                  <a
                    href="#"
                    className="px-2 text-sm py-2 flex items-center justify-between text-gray-dark hover:bg-second hover:text-white transition-colors duration-150"
                  >
                    Máy tính{" "}
                    <i className="ri-arrow-right-s-line leading-none"></i>
                  </a>
                  <div className="invisible group-hover/category-item:visible absolute shadow-md left-full bg-white top-0 px-3 py-2 w-[800px] h-full">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <h5 className="font-semibold text-gray-darked mb-1 text-sm">
                          Laptop theo thương hiệu
                        </h5>
                        <div className="ps-2 flex flex-col gap-y-1">
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Apple(Macbook)
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Acer
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            ASUS
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Dell
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            HP
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Lenovo
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            LG
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            MSI
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Gigabyte
                          </a>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-darked mb-1 text-sm">
                          Laptop theo cấu hình
                        </h5>
                        <div className="ps-2 flex flex-col gap-y-1">
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            RTX 30 Series
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            RTX 40 Series
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i3
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i5
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i7
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i9
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop Ryzen 3
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop Ryzen 3
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop Ryzen 3
                          </a>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-darked mb-1 text-sm">
                          Laptop theo thương hiệu
                        </h5>
                        <div className="ps-2 flex flex-col gap-y-1">
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Apple(Macbook)
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Acer
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            ASUS
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Dell
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            HP
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Lenovo
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            LG
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            MSI
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Gigabyte
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group/category-item">
                  <a
                    href="#"
                    className="px-2 py-2 flex items-center justify-between text-sm text-gray-dark hover:bg-second hover:text-white transition-colors duration-150"
                  >
                    Laptop{" "}
                    <i className="ri-arrow-right-s-line leading-none"></i>
                  </a>
                  <div className="invisible group-hover/category-item:visible absolute shadow-md left-full bg-white top-0 px-3 py-2 w-[800px] h-full">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <h5 className="font-semibold text-gray-darked mb-1 text-sm">
                          Laptop theo thương hiệu
                        </h5>
                        <div className="ps-2 flex flex-col gap-y-1">
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Apple(Macbook)
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Acer
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            ASUS
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Dell
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            HP
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Lenovo
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            LG
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            MSI
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Gigabyte
                          </a>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-darked mb-1 text-sm">
                          Laptop theo cấu hình
                        </h5>
                        <div className="ps-2 flex flex-col gap-y-1">
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            RTX 30 Series
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            RTX 40 Series
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i3
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i5
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i7
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop i9
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop Ryzen 3
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop Ryzen 3
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Laptop Ryzen 3
                          </a>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-darked mb-1 text-sm">
                          Laptop theo thương hiệu
                        </h5>
                        <div className="ps-2 flex flex-col gap-y-1">
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Apple(Macbook)
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Acer
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            ASUS
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Dell
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            HP
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Lenovo
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            LG
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            MSI
                          </a>
                          <a
                            href="#"
                            className="text-gray-dark text-xs hover:text-second"
                          >
                            Gigabyte
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-2 py-2 flex items-center justify-between text-sm text-gray-dark hover:bg-second hover:text-white transition-colors duration-150"
                >
                  Điện thoại{" "}
                  <i className="ri-arrow-right-s-line leading-none"></i>
                </a>
                <a
                  href="#"
                  className="px-2 py-2 flex items-center justify-between text-sm text-gray-dark hover:bg-second hover:text-white transition-colors duration-150"
                >
                  Tai nghe{" "}
                  <i className="ri-arrow-right-s-line leading-none"></i>
                </a>
                <a
                  href="#"
                  className="px-2 py-2 flex items-center justify-between text-sm text-gray-dark hover:bg-second hover:text-white transition-colors duration-150"
                >
                  Thùng máy{" "}
                  <i className="ri-arrow-right-s-line leading-none"></i>
                </a>
              </div>
            </div>
            <div
              href="#"
              className="flex items-center gap-x-2 text-white w-fit cursor-pointer transition-colors duration-150"
            >
              <span className="text-sm font-medium">Thương hiệu</span>
            </div>
            <div
              href="#"
              className="flex items-center gap-x-2 text-white w-fit cursor-pointer  transition-colors duration-150"
            >
              <span className="text-sm font-medium">Bán chạy</span>
            </div>
            <div
              href="#"
              className="flex items-center gap-x-2 text-white w-fit cursor-pointer transition-colors duration-150"
            >
              <NavLink to={"/products"} className={"text-sm font-medium"}>
                Sản phẩm
              </NavLink>
            </div>
            <NavLink
              to={"/promotion"}
              className="flex items-center gap-x-2 text-white w-fit cursor-pointer transition-colors duration-150"
            >
              <span className="text-sm font-medium">Khuyến mãi</span>
            </NavLink>
          </div>

          <div className="flex items-center gap-x-3">
            <div
              href="#"
              className="group/download relative flex items-center gap-x-1 text-white w-fit cursor-pointer transition-colors duration-150 pr-3 border-r"
            >
              <img src={Phone} alt="" className="w-5" />
              <span className="text-sm font-medium">Tải ứng dụng</span>

              <div className="absolute invisible group-hover/download:visible z-50 top-[130%] -right-2 bg-white w-72 shadow-md border-t border-gray-100 px-4 py-8 text-center before:absolute before:w-full before:h-5 before:bg-transparent before:-top-4 before:right-0 transition-all duration-200">
                <h4 className="font-medium text-gray-dark mb-3 text-sm">
                  Quét QR để tải ứng dụng
                </h4>
                <div className="flex items-center justify-center">
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
              <span className="text-sm font-medium">Tiếng Việt</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
