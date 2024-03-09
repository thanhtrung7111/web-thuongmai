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
    productDetail: {},
    productImageDetail: null,
  },


  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload?.data?.RETNDATA[0];
    });

    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.errorMessageProduct = action.payload;
    });
    builder.addMatcher(isPending, (state) => {
      state.isLoadingProduct = true;
    });

    builder.addMatcher(isFulfilled, (state) => {
      state.isLoadingProduct = false;
    });

    builder.addMatcher(isRejected, (state) => {
      state.isLoadingProduct = false;
    });
  },
});

export default productSlice.reducer;
