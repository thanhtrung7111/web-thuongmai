import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    selectedCategory: {},
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload; // ['laptop', 'nhu-cau', 'do-hoa']
    },
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
