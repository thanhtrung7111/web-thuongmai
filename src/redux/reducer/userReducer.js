import {
  createSlice,
  current,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { users } from "../../data";
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

    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
    },

    saveTokenUser: (state, action) => {
      state.tokenUser.data = action.payload.token;
    },

    saveLocations: (state, action) => {
      state.locations = action.payload.locations;
    },

    saveTokenLocation: (state, action) => {
      state.tokenLocation.data = action.payload.data;
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
});
export const {
  logout,
  saveSearch,
  clearSearch,
  saveCurrentUrl,
  removeKeyword,
  saveTokenInitial,
  saveTokenUser,
  saveTokenLocation,
  loginSuccess,
  saveLocations,
} = userSlice.actions;
export default userSlice.reducer;
