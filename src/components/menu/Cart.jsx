import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../assets/img/box.png";
import Triangle from "../../assets/img/triangle.png";
import { NavLink, useNavigate } from "react-router-dom";
import RowCart from "./RowCart";
import AnimateSkeleton from "../AnimateSkeleton";
import { useFetchCartMutation } from "../../redux/query/cartQuery";
const Cart = () => {
  const dispatch = useDispatch();
  const [
    fetchCart,
    { data: cartData, isLoading: isLoadingCart, isError: isErrorCart },
  ] = useFetchCartMutation();
  const { productCarts } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();

  const openCart = () => {
    if (window.innerWidth < 768) {
      document.getElementById("cart-small").classList.add("show-small-cart");
      // dispatch(openBlock());
      setOverlay(true);
    }
  };
  const handleCloseCart = () => {
    document.getElementById("cart-small").classList.remove("show-small-cart");
    // dispatch(closeBlock());
    setOverlay(false);
    console.log(overlay);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductFromCart({ id: id }));
  };

  const handlePayment = () => {
    handleCloseCart();
    window.scroll(0, 0);
    navigate("/pay");
  };

  useEffect(() => {
    const fetchDataCart = async () => {
      try {
        await fetchCart({
          DCMNCODE: "APPCARTPRDC",
          CONDFLTR: "UserLogin like '000005'",
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser !== null) {
      fetchDataCart();
    }
  }, [currentUser]);

  return isLoadingCart ? (
    <AnimateSkeleton className={"w-20 h-5"}></AnimateSkeleton>
  ) : (
    <>
      {overlay && (
        <div
          className="fixed right-0 top-0 h-full w-full bg-black bg-opacity-20 z-50 lg:hidden"
          onClick={() => {
            dispatch(closeBlock());
            setOverlay(false);
            document
              .getElementById("cart-small")
              .classList.remove("show-small-cart");
          }}
        ></div>
      )}

      <div className="group/cart relative">
        <div
          className="flex items-center justify-center gap-x-1 text-gray cursor-pointer"
          onClick={openCart}
        >
          <div className="relative">
            <i className="ri-shopping-cart-line text-xl"></i>
            {productCarts?.length > 0 && (
              <div className="absolute -top-2 -right-3 bg-second w-5 h-5 text-[12px] text-white rounded-full flex items-center justify-center">
                {productCarts?.length}
              </div>
            )}
          </div>
          <span className="text-sm hidden md:block"> Giỏ hàng</span>
        </div>

        <div
          className={`lg:opacity-0 lg:invisible lg:rounded-lg lg:border lg:border-gray-200 lg:group-hover/cart:opacity-100 lg:group-hover/cart:visible lg:absolute z-50 transition-rightOpacityVisibility ease-linear bg-white lg:h-fit lg:top-[120%] lg:!-right-1/4 shadow-md lg:w-[450px] w-[400px] px-4 py-5 border-t border-gray-100 before:absolute before:h-10 before:w-full before:bg-transparent before:-top-3 before:right-0
    fixed top-0 -right-full h-screen`}
          id="cart-small"
        >
          <div className="absolute -top-2 right-10">
            <img src={Triangle} className="w-4 h-2" alt="" />
          </div>
          <div className="block lg:hidden">
            <i
              class="ri-arrow-right-double-fill text-xl inline-block hover:translate-x-2 transition-transform duration-200 cursor-pointer hover:text-second"
              onClick={handleCloseCart}
            ></i>
          </div>
          <h3 className="text-lg text-gray-500 font-normal text-start relative pb-2">
            Sản phẩm trong giỏ
          </h3>
          {productCarts != null && productCarts?.length != 0 ? (
            <div className={`flex flex-col overflow-y-scroll h-96  shadow-sm`}>
              {(productCarts ? productCarts : []).map((item) => {
                return (
                  <div key={item.PRDCCODE}>
                    <RowCart
                      item={item}
                      id={"PRDCCODE"}
                      name={"PRDCNAME"}
                      price={"SALEPRCE"}
                      amount={"QUOMQTTY"}
                      image={"PRDCIMAGE"}
                      unit={"QUOMCODE"}
                      saleoff={"DSCNRATE"}
                      handleDelete={handleDelete}
                    ></RowCart>
                  </div>
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
          {productCarts != null && productCarts?.length != 0 && (
            <div className="flex items-center justify-between mt-3 text-gray-dark text-sm">
              <span>Tổng sản phẩm: {productCarts?.length}</span>
              <button
                type="button"
                onClick={handlePayment}
                className="px-5 py-2 bg-second text-white hover:opacity-90 transition-all duration-100 text-xs rounded-sm"
              >
                Xem giỏ hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
