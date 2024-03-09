import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@assets/img/box.png";
import {
  increamentAmountProduct,
  decreamentAmountProduct,
  deleteProductFromCart,
} from "@redux/actions/CartAction";
import RowCart from "./RowCart";
const SmallCard = ({ data, id, name, price, amount, image }) => {
  const dispatch = useDispatch();
  const { isLoadingCart } = useSelector((state) => state.cart);
  const handleCloseCart = () => {
    document.getElementById("cart-small").classList.remove("show-small-cart");
  };

  const handleDelete = (id) => {
    dispatch(deleteProductFromCart({ id: id }));
  };
  return (
    <>
      {/* <div className="fixed h"></div> */}
      <div
        className={`lg:hidden lg:group-hover/cart:block lg:absolute bg-white lg:h-fit lg:top-[140%] z-10 lg:!-right-1/4 shadow-md lg:w-[450px] w-[400px] px-4 py-5 border-t border-gray-100 before:absolute before:h-10 before:w-full before:bg-transparent before:-top-3 before:right-0
    fixed top-0 -right-full h-screen`}
        id="cart-small"
      >
        <div className="block lg:hidden">
          <i
            class="ri-arrow-right-double-fill text-xl inline-block hover:translate-x-2 transition-transform duration-200 cursor-pointer hover:text-second"
            onClick={handleCloseCart}
          ></i>
        </div>
        <h3 className="text-lg text-gray-500 font-normal text-start relative border-b pb-1">
          Sản phẩm trong giỏ
        </h3>
        {data?.length != 0 ? (
          <div
            className={`flex flex-col overflow-y-scroll lg:h-80 h-auto border-y border-gray-50 shadow-sm`}
          >
            {data.map((item) => {
              return (
                <RowCart
                  item={item}
                  id={"PRDCCODE"}
                  name={"PRDCNAME"}
                  price={"PRCEDSCN"}
                  amount={"quantity"}
                  image={"PRDCIMGE"}
                  handleDelete={handleDelete}
                ></RowCart>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center flex-col mt-4">
            <img src={Box} alt="" className="w-20 mb-2" />
            <span className="text-sm text-gray-dark">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </span>
            <NavLink
              to={"/products"}
              className="bg-second text-white text-sm py-2 px-3 mt-2 hover:opacity-90"
            >
              Tới cửa hàng
            </NavLink>
          </div>
        )}

        {data?.length != 0 && (
          <div className="flex items-center justify-between mt-3 text-gray-dark text-sm">
            <span>Tổng số lượng sản phẩm: {data.length}</span>
            <NavLink
              to={"/pay"}
              className="px-5 py-2 bg-second text-white hover:opacity-90 transition-all duration-100 text-xs rounded-sm"
            >
              Xem giỏ hàng
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default SmallCard;
