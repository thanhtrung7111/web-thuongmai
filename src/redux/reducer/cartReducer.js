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
    productCarts: [],
    isLoadingCart: false,
    errorMessageCart: "",
    isError: false,
  },

  reducers: {
    clearCart: (state, action) => {
      return {
        productCarts: [],
        isLoadingCart: false,
        errorMessageCart: "",
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
    builder.addCase(loadCart.fulfilled, (state, action) => {
      console.log(action.payload?.RETNDATA);
      state.productCarts = action.payload?.data?.RETNDATA;
      state.errorMessageCart = "";
    });

    // Thêm sản phẩm mới vào giỏ hàng
    builder.addCase(addToCart.fulfilled, (state, action) => {
      console.log(action.payload);
      state.productCarts.push({
        ...action.payload,
      });
      toast.success("Thêm sản phẩm vào giỏ thành công", {
        autoClose: 2000,
      });
    });

    // Thêm sản phẩm mới vào giỏ hàng
    builder.addCase(updateAmountProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      try {
        state.productCarts.find(
          (item) => item.PRDCCODE == action.payload?.PRDCCODE
        ).QUOMQTTY = action.payload.QUOMQTTY;
        toast.success("Thêm sản phẩm vào giỏ thành công", {
          autoClose: 2000,
        });
      } catch (error) {
        console.log(error);
      }
    });

    builder.addCase(addToCart.rejected, (state, action) => {
      state.errorMessageCart = action.payload;
      state.isLoadingCart = false;
      toast.warning("Sản phẩm đã có trong giỏ hàng!", {
        autoClose: 2000,
      });
    });

    // Tăng sản phẩm lên 1
    builder.addCase(increamentAmountProduct.fulfilled, (state, action) => {
      state.productCarts.find(
        (item) => item.PRDCCODE === action.payload.HEADER[0].PRDCCODE
      ).QUOMQTTY += 1;
    });

    // Giảm sản phẩm xuống 1
    builder.addCase(decreamentAmountProduct.fulfilled, (state, action) => {
      console.log(action);
      state.productCarts.find(
        (item) => item.PRDCCODE === action.payload.HEADER[0].PRDCCODE
      ).QUOMQTTY -= 1;
    });

    builder.addCase(changeAmoutProduct.fulfilled, (state, action) => {
      state.productCarts.find(
        (item) => item.PRDCCODE === action.payload.HEADER[0].PRDCCODE
      ).QUOMQTTY = action.payload.HEADER[0].QUOMQTTY;
    });

    // Giảm sản phẩm xuống 1
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      console.log(action.payload);
      const productFind = state.productCarts.find(
        (item) => item.PRDCCODE == action.payload.PRDCCODE
      );
      console.log(productFind);
      console.log(state);
      if (productFind !== null) {
        return {
          ...state,
          productCarts: state.productCarts.filter(
            (item) => item.PRDCCODE != action.payload.PRDCCODE
          ),
        };
      }
    });

    builder.addCase(deleteProductFromCart.rejected, (state, action) => {
      state.errorMessageCart = action.payload;
      state.isLoadingCart = false;
      toast.warning("Xóa sản phẩm không thành công!", {
        autoClose: 2000,
      });
    });

    builder.addMatcher(isPending, (state, action) => {
      state.isLoadingCart = true;
      state.isError = false;
    });

    builder.addMatcher(isFulfilled, (state) => {
      state.isLoadingCart = false;
      state.isError = false;
    });

    builder.addMatcher(isRejected, (state, action) => {
      state.errorMessageCart = action.payload;
      state.isLoadingCart = false;
      state.isError = true;
    });
  },
});

export default cartSlice.reducer;
export const { clearCart, chooseProduct, chooseAllProduct } = cartSlice.actions;
