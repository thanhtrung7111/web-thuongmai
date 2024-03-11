import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCategoryList, fetchDataCommon } from "../../api/api";
export const loadProduct = createAsyncThunk(
  "common/products",
  async (data, { rejectWithValue }) => {
    try {
      const products = await fetchDataCommon(data);
      if (products) {
        return products;
      } else {
        return rejectWithValue(products);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadWareHouse = createAsyncThunk(
  "common/warehouse",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstWareHouse",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadLocations = createAsyncThunk(
  "common/locations",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstLocation",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadCUOM = createAsyncThunk(
  "common/CUOM",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstCUOM",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadTimeType = createAsyncThunk(
  "common/timeType",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstTimeType",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadDlvrType = createAsyncThunk(
  "common/DlvrType",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstDlvrType",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const loadDcmnSbCd = createAsyncThunk(
  "common/lstDcmnSbCd",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstDcmnSbCd",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadDlvrMthd = createAsyncThunk(
  "common/lstDlvrMthd",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstDlvrMthd",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadListHour = createAsyncThunk(
  "common/lstListHour",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstListHour",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadinpCustOdMtPayMthd2 = createAsyncThunk(
  "common/lst_inpCustOdMt_Pay_Mthd_2",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lst_inpCustOdMt_Pay_Mthd_2 ",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
export const loadLstQUOM = createAsyncThunk(
  "common/lstQUOM",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchCategoryList({
        LISTCODE: "lstQUOM ",
      }).then((res) => res?.data?.RETNDATA);
      console.log(result);
      if (result) {
        return result;
      } else {
        rejectWithValue(result);
      }
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
