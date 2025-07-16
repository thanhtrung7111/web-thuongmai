import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
    catalog: false,
  },

  reducers: {
    openPopup: (state, action) => {
      state.popup = true;
    },
    closePopup: (state, action) => {
      state.popup = false;
    },
    openCatalog: (state, action) => {
      state.catalog = true;
    },
    closeCatalog: (state, action) => {
      state.catalog = false;
    },
  },
});

export default popupSlice.reducer;
export const { openPopup, closePopup, openCatalog, closeCatalog } =
  popupSlice.actions;
