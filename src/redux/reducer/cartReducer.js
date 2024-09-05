import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCarts: null,
    actionCart: "",
  },

  reducers: {
    checkAllProduct: (state, action) => {
      state.productCarts = [
        ...state.productCarts.map((item) => ({
          ...item,
          checked: action.payload.checked,
        })),
      ];
    },
    unCheckAllProduct: (state, action) => {
      state.productCarts = [
        ...state.productCarts.map((item) => ({
          ...item,
          checked: false,
        })),
      ];
    },
    checkProduct: (state, action) => {
      const findIndex = state.productCarts.findIndex(
        (item) => item.PRDCCODE == action.payload.id
      );
      const itemFind = state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      );
      itemFind.checked = !itemFind.checked;
      state.productCarts[findIndex] = itemFind;
    },
    checkProductPay: (state, action) => {
      const findIndex = state.productCarts.findIndex(
        (item) => item.PRDCCODE == action.payload.id
      );
      const itemFind = state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      );
      itemFind.checked = true;
      state.productCarts[findIndex] = itemFind;
    },
    loadCartByUser: (state, action) => {
      state.productCarts = [
        ...action.payload.list.map((item) => {
          return { ...item, checked: false };
        }),
      ];
    },
    addCartByUser: (state, action) => {
      state.productCarts.push({ ...action.payload.product, checked: false });
    },
    updateCartByUser: (state, action) => {
      const index = state.productCarts.findIndex(
        (item) => item.PRDCCODE == action.payload.product.PRDCCODE
      );
      state.productCarts[index] = {
        ...action.payload.product,
        checked: state.productCarts[index]?.checked,
      };
    },
    deleteCartByUser: (state, action) => {
      state.productCarts = state.productCarts.filter(
        (item) => item.PRDCCODE != action.payload.product.PRDCCODE
      );
    },
    changeActionCart: (state, action) => {
      state.actionCart = action.payload.action;
    },
    clearCart: (state, action) => {
      return {
        productCarts: null,
      };
    },
  },
});

export default cartSlice.reducer;
export const {
  loadCartByUser,
  addCartByUser,
  updateCartByUser,
  deleteCartByUser,
  clearCart,
  chooseProduct,
  chooseAllProduct,
  changeActionCart,
  checkAllProduct,
  checkProduct,
  unCheckAllProduct,
  checkProductPay,
} = cartSlice.actions;
