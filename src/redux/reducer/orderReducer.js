import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  getAllOrder,
  getOrderDetail,
  postOrder,
} from "../actions/orderActions";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    listOrder: [],
    orderDetail: null,
    isLoadingOrder: false,
    isErrorOrder: false,
    resultOrder: "",
  },

  extraReducers: (builder) => {
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.listOrder = action.payload;
    });

    builder.addCase(getAllOrder.rejected, (state, action) => {
      state.isErrorOrder = true;
    });

    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.resultOrder = action.payload;
    });

    builder.addCase(postOrder.rejected, (state, action) => {
      state.isErrorOrder = true;
    });

    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      state.orderDetail = action.payload?.RETNDATA[0];
    });

    builder.addMatcher(isPending, (state, action) => {
      state.isLoadingOrder = true;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.isLoadingOrder = false;
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      state.isLoadingOrder = false;
    });
  },
});

export const orderReducer = orderSlice.reducer;
