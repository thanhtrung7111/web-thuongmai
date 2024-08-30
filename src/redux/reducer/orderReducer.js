import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { getAllOrder, getOrderDetail } from "../actions/orderActions";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    listOrder: {
      data: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
    orderDetail: {
      data: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
    resultOrder: {
      data: null,
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state, action) => {
        state.listOrder.data = null;
        state.listOrder.isLoading = true;
        state.listOrder.isError = false;
        state.listOrder.errorMessage = "";
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.listOrder.data = action.payload;
        state.listOrder.isLoading = false;
        state.listOrder.isError = false;
        state.listOrder.errorMessage = "";
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.listOrder.data = null;
        state.listOrder.isLoading = false;
        state.listOrder.isError = true;
        state.listOrder.errorMessage = action.payload;
      });

    builder
      .addCase(getOrderDetail.pending, (state, action) => {
        state.orderDetail.data = false;
        state.orderDetail.isLoading = true;
        state.orderDetail.isError = false;
        state.orderDetail.errorMessage = "";
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetail.data = action.payload;
        state.orderDetail.isLoading = false;
        state.orderDetail.isError = false;
        state.orderDetail.errorMessage = "";
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.orderDetail.data = null;
        state.orderDetail.isLoading = false;
        state.orderDetail.isError = true;
        state.orderDetail.errorMessage = action.payload;
      });
  },
});

export default orderSlice.reducer;
