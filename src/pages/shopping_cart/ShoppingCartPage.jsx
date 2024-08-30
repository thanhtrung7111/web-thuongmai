import React, { useEffect, useRef, useState } from "react";
import Asus from "../../assets/img/asus.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InfoPage from "../../components/InfoPage";
import TableDetailProduct from "./component/TableDetailProduct";
import Wrapper from "../../components/Wrapper";
import ButtonForm from "../../components/commonForm/ButtonForm";
import {
  checkAllProduct,
  checkProduct,
  unCheckAllProduct,
} from "../../redux/reducer/cartReducer";
import { toast } from "react-toastify";
const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const checkAll = (checked) => {
    dispatch(checkAllProduct({ checked: checked }));
  };

  const checkItem = (id) => {
    dispatch(checkProduct({ id: id }));
  };

  const handleConvertPay = () => {
    const findItem = productCarts.find((item) => item.checked == true);
    if (!findItem) {
      toast.warning("Bạn chưa chọn sản phẩm để thanh toán!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      });
      return;
    }
    navigate("/pay");
  };

  const handleConvertBuy = () => {
    navigate("/products");
  };


  return (
    <div className="product-detail">
      <InfoPage data={["Giỏ hàng"]} />

      {/* Table thanh toán */}
      <div className="xl:container xl:mx-auto mx-5 mb-5">
        <Wrapper>
          <div>
            <TableDetailProduct
              onHandleCheckAll={checkAll}
              onHandleChooseItem={checkItem}
              data={productCarts}
            ></TableDetailProduct>
          </div>
        </Wrapper>
      </div>
      <div className="xl:container xl:mx-auto mx-5 mb-5">
        <div className="flex gap-x-3 justify-end">
          <ButtonForm
            className="!w-fit !bg-slate-500"
            label={"Tiếp tục mua sắm"}
            type="button"
            onClick={handleConvertBuy}
          ></ButtonForm>
          <ButtonForm
            className="!w-fit"
            label={"Thanh toán"}
            type="button"
            onClick={handleConvertPay}
          ></ButtonForm>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
