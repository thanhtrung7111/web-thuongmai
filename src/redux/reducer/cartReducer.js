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
  changeAmoutProduct,
  decreamentAmountProduct,
  deleteProductFromCart,
  increamentAmountProduct,
  loadCart,
  updateAmountProduct,
} from "../actions/cartAction";
import { toast } from "react-toastify";
import session from "redux-persist/lib/storage/session";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCarts: null,
    loadingCart: {
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
    actionCart: {
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
  },

  reducers: {
    clearCart: (state, action) => {
      return {
        productCarts: null,
        loadingCart: {
          isLoading: false,
          isError: false,
          errorMessage: "",
        },
        actionCart: {
          isLoading: false,
          isError: false,
          errorMessage: "",
        },
      };
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
    builder
      .addCase(loadCart.pending, (state, action) => {
        state.productCarts = null;
        state.loadingCart.errorMessage = "";
        state.loadingCart.isError = false;
        state.loadingCart.isLoading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.productCarts = action.payload?.data?.RETNDATA;
        state.loadingCart.errorMessage = "";
        state.loadingCart.isError = false;
        state.loadingCart.isLoading = false;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.productCarts = null;
        state.loadingCart.errorMessage = action.payload;
        state.loadingCart.isError = true;
        state.loadingCart.isLoading = false;
      });

    // Thêm sản phẩm mới vào giỏ hàng
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.actionCart.isLoading = true;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
        toast.success("Thêm sản phẩm vào giỏ thành công", {
          autoClose: 2000,
          position: "top-center",
        });
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.productCarts.push({
          ...action.payload,
        });
        state.actionCart.isLoading = false;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.actionCart.isLoading = false;
        state.actionCart.errorMessage = action.payload;
        state.actionCart.isError = true;
      });

    // Thêm sản phẩm mới vào giỏ hàng
    builder
      .addCase(updateAmountProduct.pending, (state, action) => {
        state.actionCart.isLoading = true;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(updateAmountProduct.fulfilled, (state, action) => {
        state.productCarts.find(
          (item) => item.PRDCCODE == action.payload?.PRDCCODE
        ).QUOMQTTY = action.payload.QUOMQTTY;
        state.actionCart.isLoading = false;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(updateAmountProduct.rejected, (state, action) => {
        state.actionCart.isLoading = false;
        state.actionCart.isError = true;
        state.actionCart.errorMessage = action.payload;
      });

    // Tăng sản phẩm lên 1
    builder
      .addCase(increamentAmountProduct.pending, (state, action) => {
        state.actionCart.isError = false;
        state.actionCart.isLoading = true;
        state.actionCart.errorMessage = "";
      })
      .addCase(increamentAmountProduct.fulfilled, (state, action) => {
        state.productCarts.find(
          (item) => item.PRDCCODE === action.payload.HEADER[0].PRDCCODE
        ).QUOMQTTY += 1;
        state.actionCart.isError = false;
        state.actionCart.isLoading = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(increamentAmountProduct.rejected, (state, action) => {
        state.actionCart.isError = true;
        state.actionCart.errorMessage = action.payload;
        state.actionCart.isLoading = false;
      });

    // Giảm sản phẩm xuống 1
    builder
      .addCase(decreamentAmountProduct.pending, (state, action) => {
        state.actionCart.isLoading = true;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(decreamentAmountProduct.fulfilled, (state, action) => {
        console.log(action);
        state.productCarts.find(
          (item) => item.PRDCCODE === action.payload.HEADER[0].PRDCCODE
        ).QUOMQTTY -= 1;
        state.actionCart.isLoading = false;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(decreamentAmountProduct.rejected, (state, action) => {
        state.actionCart.isLoading = false;
        state.actionCart.isError = true;
        state.actionCart.errorMessage = action.payload;
      });

    builder
      .addCase(changeAmoutProduct.pending, (state, action) => {
        state.actionCart.isLoading = true;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(changeAmoutProduct.fulfilled, (state, action) => {
        state.productCarts.find(
          (item) => item.PRDCCODE === action.payload.HEADER[0].PRDCCODE
        ).QUOMQTTY = action.payload.HEADER[0].QUOMQTTY;
        state.actionCart.isLoading = false;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(changeAmoutProduct.rejected, (state, action) => {
        state.actionCart.isLoading = false;
        state.actionCart.isError = true;
        state.actionCart.errorMessage = action.payload;
      });

    // Giảm sản phẩm xuống 1
    builder
      .addCase(deleteProductFromCart.pending, (state, action) => {
        state.actionCart.isLoading = true;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.productCarts = state.productCarts.filter(
          (item) => item.PRDCCODE != action.payload.PRDCCODE
        );
        state.actionCart.isLoading = false;
        state.actionCart.isError = false;
        state.actionCart.errorMessage = "";
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.actionCart.isLoading = false;
        state.actionCart.errorMessage = action.payload;
        state.actionCart.isError = true;
        toast.success("Xóa sản phẩm thất bại!", {
          autoClose: 2000,
          position: "top-center",
        });
      });
  },
});

export default cartSlice.reducer;
export const { clearCart, chooseProduct, chooseAllProduct } = cartSlice.actions;
