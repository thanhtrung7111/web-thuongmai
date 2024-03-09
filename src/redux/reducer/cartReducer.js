import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  addToCart,
  decreamentAmountProduct,
  deleteProductFromCart,
  increamentAmountProduct,
  loadCart,
} from "../actions/cartAction";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCarts: [],
    isLoadingCart: false,
    errorMessageCart: "",
  },

  reducers: {
    clearCart: (state, action) => {
      state.productCarts = [];
      state.isLoadingCart = false;
      state.errorMessageCart = "";
    },
    chooseProduct: (state, action) => {
      state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      ).choose = !state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      ).choose;
    },

    chooseAllProduct: (state, action) => {
      console.log(action.payload);
      state.productCarts = state.productCarts.map((item) => {
        return { ...item, choose: action.payload };
      });
    },
  },

  extraReducers: (builder) => {
    // Load thông tin giỏ hàng
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.productCarts = action.payload;
      state.errorMessageCart = "";
    });

    builder.addCase(loadCart.rejected, (state, action) => {
      state.errorMessageCart = action.payload;
      state.isLoadingCart = false;
    });

    // Thêm sản phẩm mới vào giỏ hàng
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const productFind = state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.PRDCCODE
      );
      console.log(state.productCarts);
      if (productFind) {
        return;
      } else {
        state.productCarts.push({
          ...action.payload,
          quantity: 1,
          choose: false,
        });
      }
    });

    builder.addCase(addToCart.rejected, (state, action) => {
      state.errorMessageCart = action.payload;
      state.isLoadingCart = false;
    });

    // Tăng sản phẩm lên 1
    builder.addCase(increamentAmountProduct.fulfilled, (state, action) => {
      console.log(action.payload.id);
      state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      ).quantity += 1;
    });

    // Giảm sản phẩm xuống 1
    builder.addCase(decreamentAmountProduct.fulfilled, (state, action) => {
      const productFind = state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      );

      if (productFind?.quantity == 1) {
        state.productCarts = state.productCarts.filter(
          (item) => item.PRDCCODE != action.payload.id
        );
        return;
      }
      productFind.quantity -= 1;
    });
    // Giảm sản phẩm xuống 1
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      const productFind = state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.id
      );

      if (productFind != null) {
        state.productCarts = state.productCarts.filter(
          (item) => item.PRDCCODE != action.payload.id
        );
        return;
      }
    });

    builder.addMatcher(isPending, (state, action) => {
      state.isLoadingCart = true;
    });

    builder.addMatcher(isFulfilled, (state) => {
      state.isLoadingCart = false;
    });
  },
});

export default cartSlice.reducer;
export const { clearCart, chooseProduct, chooseAllProduct } = cartSlice.actions;
