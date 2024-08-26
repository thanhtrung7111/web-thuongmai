import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
  },

  reducers: {
    openPopup: (state, action) => {
      state.popup = true;
    },
    closePopup: (state, action) => {
      state.popup = false;
    },
  },
});

export default popupSlice.reducer;
export const { openPopup, closePopup } = popupSlice.actions;
