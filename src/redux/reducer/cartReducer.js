import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCarts: null,
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
    clearCart: (state, action) => {
      return {
        productCarts: null,
      };
    },
    chooseProduct: (state, action) => {
      if (action.payload.checked) {
        state.productCarts.find(
          (item) => item.PRDCCODE == action.payload.id
        ).checked = action.checked;
        return;
      }
      state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      ).checked = !state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      ).checked;
    },

    chooseAllProduct: (state, action) => {
      console.log(action.payload);
      state.productCarts = state.productCarts.map((item) => {
        return { ...item, checked: action.payload };
      });
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
} = cartSlice.actions;
