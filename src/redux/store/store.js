import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
// import sessionStorage from "redux-persist/es/storage/session";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { commonApiSlice } from "../query/commonQuery";
import cartReducer from "../reducer/cartReducer";
import userReducer from "../reducer/userReducer";
import commonReducer from "../reducer/commonReducer";
import productReducer from "../reducer/productReducer";
import popupReducer from "../reducer/popupReducer";
import orderReducer from "../reducer/orderReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  version: 1,
  whitelist: ["user"],
  // blacklist: [
  //   "user",
  //   "cart",
  //   "common",
  //   "product",
  //   "popup",
  //   "order",
  //   commonApiSlice.reducerPath,
  // ],
};
const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  version: 1,
  whitelist: ["currentUser"],
};

// const cartPersistConfig = {
//   key: "cart",
//   storage: session,
//   version: 1,
//   whitelist: ["productCarts"],
// };

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  cart: cartReducer,
  common: commonReducer,
  product: productReducer,
  popup: popupReducer,
  order: orderReducer,
  [commonApiSlice.reducerPath]: commonApiSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(commonApiSlice.middleware),
});

export default store;
export const persistor = persistStore(store);
