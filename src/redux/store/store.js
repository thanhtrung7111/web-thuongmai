import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "@redux/reducer/userReducer";
import cartReducer from "@redux/reducer/cartReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import localStorage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";
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
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootPersistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user", "cart"],
  // stateReconciler: autoMergeLevel2, // ADDED
};

const rootReducer = combineSlices({
  user: userReducer,
  cart: cartReducer,
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
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
