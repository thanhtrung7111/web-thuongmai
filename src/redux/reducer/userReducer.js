import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../data";
import { login, loginLCTN } from "../actions/userAction";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoadingUser: false,
    errorMessageUser: "",
    currentUser: null,
    locations: {},
    productSearchs: [],
  },

  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.errorMessageUser = "";
      state.isLoadingUser = false;
    },

    saveSearch: (state, action) => {
      state.productSearchs.push(action.payload);
    },

    clearSearch: (state, action) => {
      state.productSearchs = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoadingUser = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      const { TOKEN, COMPLIST, USERLGIN } = action.payload;
      sessionStorage.setItem("tokenUser", TOKEN);
      state.locations = COMPLIST[0];
      state.currentUser = { TOKEN, ...USERLGIN };
      state.isLoadingUser = false;
    });
    builder.addCase(loginLCTN.fulfilled, (state, action) => {
      console.log(action.payload);
      const { TOKEN, COMPLIST, USERLGIN } = action.payload;
      sessionStorage.setItem("tokenUser", TOKEN);
      state.locations = COMPLIST[0];
      // state.currentUser = { TOKEN, ...USERLGIN };
      state.isLoadingUser = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.errorMessageUser = action.error;
      state.isLoadingUser = false;
    });
  },
});
export const { logout, saveSearch, clearSearch } = userSlice.actions;
export default userSlice.reducer;
