import axios from "axios";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import {
  openAppNotify,
  openEvaluateProduct,
} from "../redux/reducer/popupReducer";
import { logout } from "../redux/reducer/userReducer";
import { clearCart } from "../redux/reducer/cartReducer";
// import store from "../redux/store/store";
// import
export let store;
export const injectStore = (_store) => {
  store = _store;
};

export const api = axios.create({
  baseURL: "https://api-dev.firstems.com",
  timeout: 10000,
  headers: {
    token:
      "CmzFIKFr7UvPe6zBPBtn3nkrWOY3UYSLLnTfii/H9QG56Ur6b9XtFty3M9tBEKV1l3d+0mGEXmfQyuGFjrNHYGSODDy+ihkBmsHYUNPgD44=",
  },
});

const apiFetchLogin = axios.create({
  baseURL: "https://api-dev.firstems.com",
  timeout: 10000,
});
apiFetchLogin.interceptors.request.use((req) => {
  if (sessionStorage.getItem("tokenInitial")) {
    req.headers["TOKEN"] = sessionStorage.getItem("tokenInitial");
  }
  return req;
});

apiFetchLogin.interceptors.response.use(
  (response) => {
    // console.log(response);
    // if (response?.data?.RETNDATA != null) {
    return response;
    // }
    // store.dispatch(logout());
    // store.dispatch(clearCart());
    // store.dispatch(openAppNotify({ link: "33432" }));
  },
  (error) => {
    if (error.response?.status === 401) {
      // store.dispatch(openAppNotify({ link: "33432" }));
    } else if (error.response?.status === 500) {
      // console.log("Hello");
      // console.log(error);
      store.dispatch(logout());
      store.dispatch(clearCart());
      window.history.go("/error");
    }
    return error;
  }
);

export const loginCustom = (body) => {
  try {
    const result = apiFetchLogin.post(
      "/Api/data/runApi_Syst?run_Code=SYS010",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

const apiFetchData = axios.create({
  baseURL: "https://api-dev.firstems.com",
  timeout: 10000,
});
apiFetchData.interceptors.request.use((req) => {
  if (
    sessionStorage.getItem("tokenUser") ||
    sessionStorage.getItem("tokenInitial")
  ) {
    req.headers["TOKEN"] =
      sessionStorage.getItem("tokenUser") ||
      sessionStorage.getItem("tokenInitial");
  } else {
    store.dispatch(openAppNotify({ link: "33432" }));
    return;
  }
  // console.log(localStorage.getItem("tokenUser"));
  return req;
});

apiFetchData.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response?.data?.RETNDATA != null) {
      return response;
    }
    store.dispatch(logout());
    store.dispatch(clearCart());
    store.dispatch(openAppNotify({ link: "33432" }));
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(openAppNotify({ link: "33432" }));
    } else if (error.response?.status === 500) {
      // console.log(error);
      store.dispatch(logout());
      store.dispatch(clearCart());
      // window.location.href = "http://localhost:5173/error";
    }
    return error;
  }
);

export const fetchLocationData = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Syst?run_Code=SYS006",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const fetchCategoryList = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA002",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const fetchListData = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA003",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const postData = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA007",
      body
    );

    return result;
  } catch (error) {
    return error;
  }
};

export const updateData = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA008",
      body
    );

    return result;
  } catch (error) {
    return error;
  }
};

export const deleteData = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA009",
      body
    );

    return result;
  } catch (error) {
    return error;
  }
};

export const fetchDataCommon = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA004",
      body
    );
    // console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

export const fetchDataDetail = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA005",
      body
    );
    return result;
  } catch (error) {
    return error;
    s;
  }
};

export const postImage = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA021",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const fetchDataCommon17 = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA017",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};