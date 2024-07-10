import { createSlice } from "@reduxjs/toolkit";

const manifySlice = createSlice({
  name: "popup",
  initialState: {
    showManify: false,
    showEvaluateProduct: { open: false, productID: "" },
    showDetailOrder: { open: false, orderDetail: null },
    showAppNotify: { open: false, link: "", message: "" },
    showAlert: { open: false, content: "" },
    block: false,
  },

  reducers: {
    openManify: (state, action) => {
      state.showManify = true;
    },

    closeManify: (state, action) => {
      state.showManify = false;
    },

    openEvaluateProduct: (state, action) => {
      state.showEvaluateProduct.open = true;
      state.showEvaluateProduct.productID = action.payload.productID;
    },

    closeEvaluateProduct: (state, action) => {
      state.showEvaluateProduct.open = false;
    },

    openDetailOrder: (state, action) => {
      state.showDetailOrder.open = true;
    },

    closeDetailOrder: (state, action) => {
      state.showDetailOrder.open = false;
    },

    openAppNotify: (state, action) => {
      state.showAppNotify.open = true;
      state.showAppNotify.link = action.payload?.link;
      state.showAppNotify.message = action.payload?.message;
    },

    closeAppNotify: (state, action) => {
      state.showAppNotify.open = false;
      state.showAppNotify.link = "";
    },

    openBlock: (state, action) => {
      console.log("hello");
      state.block = true;
    },

    closeBlock: (state, action) => {
      state.block = false;
    },
  },
});

export const popupReducer = manifySlice.reducer;
export const {
  openManify,
  closeManify,
  openEvaluateProduct,
  closeEvaluateProduct,
  openDetailOrder,
  closeDetailOrder,
  openAppNotify,
  closeAppNotify,
  openBlock,
  closeBlock,
} = manifySlice.actions;
