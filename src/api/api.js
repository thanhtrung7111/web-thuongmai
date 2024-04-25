import axios from "axios";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import {
  openAppNotify,
  openEvaluateProduct,
} from "../redux/reducer/popupReducer";
import { logout } from "../redux/reducer/userReducer";
// import store from "../redux/store/store";
// import
export let store;
export const injectStore = (_store) => {
  store = _store;
};

export const api = axios.create({
  baseURL: "https://Api-Dev.firstems.com",
  headers: {
    token:
      "CmzFIKFr7UvPe6zBPBtn3nkrWOY3UYSLLnTfii/H9QG56Ur6b9XtFty3M9tBEKV1l3d+0mGEXmfQyuGFjrNHYGSODDy+ihkBmsHYUNPgD44=",
  },
});

const apiFetchLogin = axios.create({
  baseURL: "https://Api-Dev.firstems.com",
  timeout: 5000,
});
apiFetchLogin.interceptors.request.use((req) => {
  if (sessionStorage.getItem("tokenInitial")) {
    req.headers["TOKEN"] = sessionStorage.getItem("tokenInitial");
  }
  return req;
});

apiFetchLogin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // store.dispatch(openAppNotify({ link: "33432" }));
    } else if (error.response?.status === 500) {
      console.log("Hello");
      console.log(error);
      store.dispatch(logout());
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
  baseURL: "https://Api-Dev.firstems.com",
  timeout: 5000,
});
apiFetchData.interceptors.request.use((req) => {
  if (sessionStorage.getItem("tokenUser")) {
    req.headers["TOKEN"] = sessionStorage.getItem("tokenUser");
  }
  // console.log(localStorage.getItem("tokenUser"));
  return req;
});

apiFetchData.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(openAppNotify({ link: "33432" }));
    } else if (error.response?.status === 500) {
      console.log(error);
      store.dispatch(logout());
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

export const fetchDataCommon = (body) => {
  try {
    const result = apiFetchData.post(
      "/Api/data/runApi_Data?run_Code=DTA004",
      body
    );
    console.log(result);
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
