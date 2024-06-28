import React, { useEffect, useState } from "react";
import Logo from "@assets/img/Icon.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { loadCart } from "@redux/actions/cartAction";
import { clearCart } from "@redux/reducer/cartReducer";
import SearchMenu from "./SearchMenu";
import Triangle from "@assets/img/triangle.png";
import { openBlock } from "../../redux/reducer/popupReducer";
import Notifycation from "./Notifycation";
import Cart from "./Cart";
import SubMenu from "./SubMenu";
import MenuChild from "./MenuChild";
import { clearSearch, logout } from "../../redux/reducer/userReducer";
import { PURGE } from "redux-persist/lib/constants";
import { deleteCacheData } from "../../helper/CacheHelper";
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(clearCart());
    await deleteCacheData();
    dispatch(clearSearch());
    dispatch(logout());
    sessionStorage.removeItem("tokenUser");
    window.scroll(0, 0);
    navigate("/login");
  };

  useEffect(() => {
    const itemParents = document.querySelectorAll(".item");
    itemParents.forEach((item) => {
      item.addEventListener("click", function (e) {
        const getItem = item.querySelector(".item-list");
        getItem?.classList?.toggle("show-list-item");
        // console.log("hello");
      });
    });
  }, []);
  return (
    <>
      <div className="py-2 border-b sticky top-0 bg-white z-30 shadow-md">
        <div className="xl:container xl:mx-auto mx-5">
          <div className="flex items-center gap-x-20">
            {/* logo  */}
            <div
              onClick={() => {
                window.scroll(0, 0);
                navigate("/");
              }}
              className="md:h-16 h-14 cursor-pointer"
            >
              <img src={Logo} alt="" className="h-full" />
            </div>

            <div className="flex gap-x-2 flex-auto md:gap-x-8 justify-end">
              <SearchMenu></SearchMenu>
              <div className="flex items-center gap-x-8">
                <Cart></Cart>
                <Notifycation></Notifycation>
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
                          {currentUser["USERNAME"]}
                        </span>
                      ) : (
                        <div
                          onClick={() => {
                            window.scroll(0, 0);
                            navigate("/login");
                          }}
                        >
                          Đăng nhập
                        </div>
                      )}

                      {currentUser && <i className="ri-arrow-down-s-line"></i>}
                    </div>
                  </div>
                  {currentUser && (
                    <div className="invisible opacity-0 group-hover/cart:visible group-hover/cart:opacity-100 transition-opacityVisibility absolute top-[130%] -right-5 bg-white shadow-md border-t border-gray-200 rounded-lg px-5 py-3 w-48 flex flex-col z-50 gap-y-3 before:content-[''] before:w-full before:h-5 before:bg-transparent before:absolute before:-top-[15%] before:left-0">
                      <div className="absolute -top-2 right-10">
                        <img src={Triangle} className="w-4 h-2" alt="" />
                      </div>
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
                        onClick={(e) => handleLogout(e)}
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
      <MenuChild></MenuChild>
    </>
  );
};

export default Menu;
