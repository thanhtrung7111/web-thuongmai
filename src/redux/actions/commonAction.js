import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchCategoryList,
  fetchDataCommon,
  fetchDataCommon17,
} from "../../api/api";
export const loadProduct = createAsyncThunk(
  "common/products",
  async (data, { rejectWithValue }) => {
    try {
      let url = "http://localhost:5173";
      let names = await caches.keys();

      const cacheStorage = await caches.open("data");

      // Fetching that particular cache data
      const cachedResponse = await cacheStorage.match(url);
      // console.log(cachedResponse.body);
      let dataa = await cachedResponse?.json();
      // console.log(dataa);
      if (dataa !== null && dataa?.length > 0 && !data.reload) {
        return data.KEY_WORD !== "%"
          ? dataa.filter(
              (item) =>
                item.PRDCNAME.toLowerCase().indexOf(
                  data.KEY_WORD.toLowerCase()
                ) !== -1
            )
          : dataa;
      } else {
        const products = await fetchDataCommon(data);
        console.log(products);
        if (products?.data?.RETNDATA?.length > 0) {
          let cache = await caches.open("data");
          const data = new Response(JSON.stringify(products?.data?.RETNDATA));
          cache.put("http://localhost:5173/", data);
          return products.data?.RETNDATA;
        } else {
          return rejectWithValue(products.data?.RETNDATA);
        }
      }
    } catch (error) {
      console.log(error);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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
      // console.log(result);
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

export const loadPmtPmtnPrgr = createAsyncThunk(
  "commmon/lstPmtPmtnPrgr",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchDataCommon17({
        DCMNCODE: "pmtPmtnPrgr",
        LCTNCODE: "001",
        LGGECODE: "{{0302}}",
        BEG_DATE: "1990-01-01",
        PARA_001: "1",
        PARA_002: "%",
        PARA_003: "2",
        PARA_004: "%",
        PARA_005: "2",
      }).then((res) => res?.data?.RETNDATA);
      // console.log(result);
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
