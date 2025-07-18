import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/Icon.png";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import Triangle from "../../assets/img/triangle.png";
import Notifycation from "./Notifycation";
import Cart from "./Cart";
import MenuChild from "./MenuChild";
import { clearSearch, logout } from "../../redux/reducer/userReducer";
import { clearCart } from "../../redux/reducer/cartReducer";
import { initialError } from "../../redux/reducer/exceptionReducer";
import { closeCatalog, openCatalog } from "../../redux/reducer/popupReducer";
import ProductCatalog from "./ProductCatalog";
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { catalog } = useSelector((state) => state.popup);
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(clearCart());
    dispatch(clearSearch());
    dispatch(initialError());
    dispatch(logout());
    sessionStorage.removeItem("tokenUser");
    sessionStorage.removeItem("tokenLocation");
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
      <MenuChild></MenuChild>
      <div className="py-2 border-b sticky top-0 bg-white z-40 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-x-3">
            {/* logo  */}
            <div className="flex items-center">
              {!location.pathname.includes("products") && (
                <div className="">
                  <button
                    onClick={() => {
                      if (catalog) {
                        dispatch(closeCatalog());
                      } else {
                        dispatch(openCatalog());
                      }
                    }}
                    className={`text-sm flex gap-x-1.5 border ${
                      catalog
                        ? "text-white bg-second border-second"
                        : "text-slate-500 border-slate-500 bg-white"
                    }  rounded-md px-2 py-1 transition-colors`}
                  >
                    <i className="ri-menu-line"></i>
                    {/* <span>Danh mục sản phẩm</span> */}
                  </button>
                  <div
                    className={`absolute top-[100%] w-screen h-screen left-0 z-10 ${
                      catalog ? "visible opacity-100" : "invisible opacity-0"
                    } transition-all`}
                  >
                    <div
                      className="absolute top-0 right-0 bg-black bg-opacity-70 w-full h-full"
                      onClick={() => dispatch(closeCatalog())}
                    ></div>
                    <div className="max-w-7xl mx-auto pt-1">
                      <div className="w-72">
                        <ProductCatalog></ProductCatalog>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  window.scroll(0, 0);
                  navigate("/");
                }}
                className="md:h-16 h-14 cursor-pointer flex items-center"
              >
                <img loading="lazy" src={Logo} alt="" className="h-full" />
              </div>
            </div>

            <div className="flex gap-x-1 flex-auto md:gap-x-8 justify-end">
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
    </>
  );
};

export default Menu;
