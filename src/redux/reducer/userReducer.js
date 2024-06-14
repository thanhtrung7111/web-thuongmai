import { createSlice, current } from "@reduxjs/toolkit";
import { users } from "../../data";
import { login, loginLCTN } from "../actions/userAction";
import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";

let stateUser = {
  isLoadingUser: false,
  errorMessageUser: "",
  currentUser: null,
  locations: {},
  productSearchs: [],
};

const userSlice = createSlice({
  name: "user",

  initialState: stateUser,

  reducers: {
    logout: (state, action) => {
      console.log(state);
      console.log(current(state));
      return stateUser;
    },

    saveSearch: (state, action) => {
      state.productSearchs.push(action.payload);
      return state;
    },

    clearSearch: (state, action) => {
      state.productSearchs = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      console.log(state);
      console.log(current(state));
      state.isLoadingUser = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      const { TOKEN, COMPLIST, USERLGIN } = action.payload;
      sessionStorage.setItem("tokenUser", TOKEN);
      state.locations = COMPLIST;
      state.currentUser = { TOKEN, ...USERLGIN };
      state.isLoadingUser = false;
    });

    builder.addCase(loginLCTN.fulfilled, (state, action) => {
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