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
import popupReducer from "../reducer/popupReducer";
import orderReducer from "../reducer/orderReducer";
import categoryReducer from "../reducer/categoryReducer";
import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import { toast } from "react-toastify";
import exceptionReducer, { errorServerOn } from "../reducer/exceptionReducer";
import { authApiSlice } from "../query/authQuery";
import { cartApiSlice } from "../query/cartQuery";
import { detailApiSlice } from "../query/detailQuery";
import { evaluateApiSlice } from "../query/evaluateQuery";
import { imageApiSlice } from "../query/imageQuery";
import { orderApiSlice } from "../query/orderQuery";
import { qrApiSlice } from "../query/qrQuery";
import { invoiceApiSlice } from "../query/invoiceQuery";
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  version: 1,
  // whitelist: ["user"],
  // blacklist: [
  //   "user",
  //   "cart",
  //   "common",
  //   "product",
  //   "popup",
  //
  //   commonApiSlice.reducerPath,
  // ],
  blacklist: [
    "order",
    commonApiSlice.reducerPath,
    authApiSlice.reducerPath,
    cartApiSlice.reducerPath,
    detailApiSlice.reducerPath,
    evaluateApiSlice.reducerPath,
    imageApiSlice.reducerPath,
    orderApiSlice.reducerPath,
    qrApiSlice.reducerPath,
  ],
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
  exception: exceptionReducer,
  cart: cartReducer,
  popup: popupReducer,
  order: orderReducer,
  category: categoryReducer,
  [commonApiSlice.reducerPath]: commonApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [cartApiSlice.reducerPath]: cartApiSlice.reducer,
  [detailApiSlice.reducerPath]: detailApiSlice.reducer,
  [evaluateApiSlice.reducerPath]: evaluateApiSlice.reducer,
  [imageApiSlice.reducerPath]: imageApiSlice.reducer,
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  [qrApiSlice.reducerPath]: qrApiSlice.reducer,
  [invoiceApiSlice.reducerPath]: invoiceApiSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const lstReject = [
  commonApiSlice.endpoints.fetchCUOM.matchRejected,
  commonApiSlice.endpoints.fetchDCmnSbcd.matchRejected,
  commonApiSlice.endpoints.fetchDlvrMthd.matchRejected,
  commonApiSlice.endpoints.fetchDlvrType.matchRejected,
  commonApiSlice.endpoints.fetchInpCustOdMtPayMthd2.matchRejected,
  commonApiSlice.endpoints.fetchListHour.matchRejected,
  commonApiSlice.endpoints.fetchLocation.matchRejected,
  commonApiSlice.endpoints.fetchPmtPmtnPrgr.matchRejected,
  commonApiSlice.endpoints.fetchProducts.matchRejected,
  commonApiSlice.endpoints.fetchQUOM.matchRejected,
  commonApiSlice.endpoints.fetchTimeType.matchRejected,
  commonApiSlice.endpoints.fetchWareHouse.matchRejected,
];

const listenerMiddleWare = createListenerMiddleware();
listenerMiddleWare.startListening({
  matcher: isAnyOf(...lstReject),
  effect: async (action, { dispatch }) => {
    console.log(action.type);
    dispatch(errorServerOn({ message: "Lỗi hệ thống!" }));
    toast.error("Lỗi hệ thống!", {
      autoClose: 1500,
      hideProgressBar: true,
      position: "top-center",
    });
  },
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      commonApiSlice.middleware,
      authApiSlice.middleware,
      cartApiSlice.middleware,
      detailApiSlice.middleware,
      evaluateApiSlice.middleware,
      imageApiSlice.middleware,
      orderApiSlice.middleware,
      qrApiSlice.middleware,
      invoiceApiSlice.middleware,
      listenerMiddleWare.middleware
    ),
});

export default store;
export const persistor = persistStore(store);
