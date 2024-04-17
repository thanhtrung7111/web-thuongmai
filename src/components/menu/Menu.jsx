import React, { useEffect, useState } from "react";
import Logo from "@assets/img/Icon.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { logout, clearSearch, saveSearch } from "@redux/reducer/userReducer";
import { loadCart } from "@redux/actions/cartAction";
import { clearCart } from "@redux/reducer/cartReducer";
import SearchMenu from "./SearchMenu";
import { openBlock } from "../../redux/reducer/popupReducer";
import Notifycation from "./Notifycation";
import Cart from "./Cart";
import SubMenu from "./SubMenu";
import MenuChild from "./MenuChild";
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearSearch());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(loadCart());
    const itemParents = document.querySelectorAll(".item");
    itemParents.forEach((item) => {
      item.addEventListener("click", function (e) {
        const getItem = item.querySelector(".item-list");
        getItem.classList.toggle("show-list-item");
        console.log("hello");
      });
    });
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
      <MenuChild></MenuChild>
    </>
  );
};

export default Menu;
