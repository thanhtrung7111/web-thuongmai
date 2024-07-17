import {
  createSlice,
  current,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { users } from "../../data";
import { login, loginLCTN } from "../actions/userAction";
import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";

let stateUser = {
  isLoadingUser: false,
  errorMessageUser: "",
  isErrorMessagesUser: false,
  currentUser: null,
  locations: {},
  productSearchs: [],
  currentUrl: "",
};

const userSlice = createSlice({
  name: "user",

  initialState: stateUser,

  reducers: {
    logout: (state, action) => {
      console.log(state);
      console.log(current(state));

      return { ...stateUser, currentUrl: state.currentUrl };
    },

    saveSearch: (state, action) => {
      state.productSearchs.push(action.payload);
    },

    removeKeyword: (state, action) => {
      state.productSearchs = state.productSearchs.filter(
        (item) => item != action.payload
      );
    },

    clearSearch: (state, action) => {
      state.productSearchs = [];
    },

    saveCurrentUrl: (state, action) => {
      console.log(action.payload.url);
      state.currentUrl = action.payload.url;
    },
  },

  extraReducers: (builder) => {
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

    builder.addMatcher(isPending, (state) => {
      state.errorMessageUser = "";
      state.isLoadingUser = true;
      state.isErrorMessagesUser = false;
    });

    builder.addMatcher(isRejected, (state, action) => {
      state.errorMessageUser = action.payload;
      state.isErrorMessagesUser = true;
      state.isLoadingUser = false;
    });

    builder.addMatcher(isFulfilled, (state, action) => {
      state.errorMessageUser = "";
      state.isErrorMessagesUser = false;
      state.isLoadingUser = false;
    });
  },
});
export const {
  logout,
  saveSearch,
  clearSearch,
  saveCurrentUrl,
  removeKeyword,
} = userSlice.actions;
export default userSlice.reducer;
