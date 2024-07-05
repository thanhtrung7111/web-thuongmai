import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "@redux/reducer/userReducer";
import cartReducer from "@redux/reducer/cartReducer";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/lib/persistStore";
import { commonReducer } from "@redux/reducer/commonReducer";
import productReducer from "@redux/reducer/productReducer";
import { popupReducer } from "@redux/reducer/popupReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { orderReducer } from "@redux/reducer/orderReducer";
// import sessionStorage from "redux-persist/es/storage/session";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import sessionStorage from "redux-persist/es/storage/session";
import { thunk } from "redux-thunk";
import { version } from "react";
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootPersistConfig = {
  key: "root",
  storage: session,
  version: 1,
  // whitelist: ["user", "cart"],
  blacklist: ["user", "cart", "common", "product", "popup", "order"],
  stateReconciler: autoMergeLevel2, // ADDED
};
const userPersistConfig = {
  key: "user",
  storage: session,
  version: 1,
  whitelist: ["currentUser", "currentUrl"],
  stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
  key: "cart",
  storage: session,
  version: 1,
  whitelist: ["productCarts"],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  common: commonReducer,
  product: productReducer,
  popup: popupReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
