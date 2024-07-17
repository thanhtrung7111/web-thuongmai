import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { fetchProductDetail } from "../actions/productAction";
const productSlice = createSlice({
  name: "product",

  initialState: {
    isLoadingProduct: true,
    errorMessageProduct: "",
    isErrorProduct: false,
    productDetail: {},
    productImageDetail: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload?.data?.RETNDATA[0];
        state.isErrorProduct = false;
        state.errorMessageProduct = "";
        state.isLoadingProduct = false;
      })
      .addCase(fetchProductDetail.pending, (state, action) => {
        state.productDetail = null;
        state.isErrorProduct = false;
        state.errorMessageProduct = "";
        state.isLoadingProduct = true;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.productDetail = null;
        state.isErrorProduct = true;
        state.errorMessageProduct = action.payload;
        state.isLoadingProduct = false;
      });
  },
});

export default productSlice.reducer;
