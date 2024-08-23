import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCarts: null,
    actionCart: "",
  },

  reducers: {
    loadCartByUser: (state, action) => {
      state.productCarts = action.payload.list;
    },
    addCartByUser: (state, action) => {
      state.productCarts.push(action.payload.product);
    },
    updateCartByUser: (state, action) => {
      const index = state.productCarts.findIndex(
        (item) => item.PRDCCODE == action.payload.product.PRDCCODE
      );
      state.productCarts[index] = action.payload.product;
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
} = cartSlice.actions;
