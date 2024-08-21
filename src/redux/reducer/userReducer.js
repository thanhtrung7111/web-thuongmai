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
  tokenInitial: {
    data: null,
    isLoading: false,
    isError: false,
    messageError: "",
  },
  tokenLocation: {
    data: null,
    isLoading: false,
    isError: false,
    messageError: "",
  },
  tokenUser: {
    data: null,
    isLoading: false,
    isError: false,
    messageError: "",
  },
  currentUrl: "",
};

const userSlice = createSlice({
  name: "user",

  initialState: stateUser,

  reducers: {
    logout: (state, action) => {
      return { ...stateUser, currentUrl: state.currentUrl };
    },

    saveTokenInitial: (state, action) => {
      state.tokenInitial.data = action.payload.token;
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
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { TOKEN, COMPLIST, USERLGIN } = action.payload;
        state.locations = COMPLIST;
        state.currentUser = { ...USERLGIN };
        state.tokenUser.data = TOKEN;
        session.setItem("tokenUser", TOKEN);
        state.isLoadingUser = false;
        state.errorMessageUser = "";
        state.isErrorMessagesUser = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoadingUser = true;
        state.isErrorMessagesUser = "";
        state.tokenUser.data = null;
        state.currentUser = null;
        state.locations = null;
        state.isErrorMessagesUser = false;
        state.errorMessageUser = "";
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoadingUser = false;
        state.errorMessageUser = action.payload;
        state.tokenUser.data = null;
        state.currentUser = null;
        state.locations = null;
        state.isErrorMessagesUser = true;
      });

    builder
      .addCase(loginLCTN.pending, (state, action) => {
        state.tokenLocation.data = null;
        state.tokenLocation.isLoading = true;
        state.tokenLocation.isError = false;
        state.tokenLocation.messageError = "";
      })
      .addCase(loginLCTN.fulfilled, (state, action) => {
        const { TOKEN, COMPLIST, USERLGIN } = action.payload;
        state.locations = COMPLIST[0];
        // state.currentUser = { TOKEN, ...USERLGIN };
        state.tokenLocation.data = TOKEN;
        state.tokenLocation.isLoading = false;
        console.log(TOKEN);
        session.setItem("tokenLocation", TOKEN);
        state.tokenLocation.isError = false;
        state.tokenLocation.messageError = "";
      })
      .addCase(loginLCTN.rejected, (state, action) => {
        // console.log("Đăng nhập thất bại");
        state.tokenLocation.data = null;
        state.tokenUser.data = null;
        state.tokenLocation.isLoading = false;
        state.tokenLocation.isError = true;
        state.tokenLocation.messageError = action.payload;
      });

    // builder.addMatcher(isPending, (state) => {
    //   state.errorMessageUser = "";
    //   state.isLoadingUser = true;
    //   state.isErrorMessagesUser = false;
    // });

    // builder.addMatcher(isRejected, (state, action) => {
    //   state.errorMessageUser = action.payload;
    //   state.isErrorMessagesUser = true;
    //   state.isLoadingUser = false;
    // });

    // builder.addMatcher(isFulfilled, (state, action) => {
    //   state.errorMessageUser = "";
    //   state.isErrorMessagesUser = false;
    //   state.isLoadingUser = false;
    // });
  },
});
export const {
  logout,
  saveSearch,
  clearSearch,
  saveCurrentUrl,
  removeKeyword,
  saveTokenInitial,
} = userSlice.actions;
export default userSlice.reducer;
