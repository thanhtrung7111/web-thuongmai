import { createSlice } from "@reduxjs/toolkit";

const initializationState = {
  errorServer: {
    message: "",
    isError: false,
  },
};
const exceptionSlice = createSlice({
  name: "exception",
  initialState: initializationState,
  reducers: {
    initialError: (state, action) => {
      state.errorServer.message = "";
      state.errorServer.isError = false;
    },
    errorServerOn: (state, action) => {
      state.errorServer.message = action.payload.message;
      state.errorServer.isError = true;
    },
    errorServerOff: (state, action) => {
      state.errorServer.message = "";
      state.errorServer.isError = false;
    },
  },
});

export default exceptionSlice.reducer;
export const { errorServerOn, errorServerOff, initialError } =
  exceptionSlice.actions;
