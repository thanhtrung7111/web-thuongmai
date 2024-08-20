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
      const products = await fetchDataCommon(data);
      console.log(products);
      if (products?.data?.RETNDATA?.length > 0) {
        return products?.data?.RETNDATA.filter(
          (item) => item.PRDCNAME.toLowerCase().indexOf("tấm trần pima") >= 0
        );
      } else {
        return rejectWithValue("Không có dữ liệu!");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const searchProduct = createAsyncThunk(
  "common/searchProduct",
  async (data, { rejectWithValue }) => {
    try {
      const products = await fetchDataCommon(data);

      if (products?.data?.RETNDATA?.length > 0) {
        return products?.data?.RETNDATA.filter(
          (item) => item.PRDCNAME.toLowerCase().indexOf("tấm trần pima") >= 0
        );
      } else {
        return rejectWithValue("Không có dữ liệu!");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Không có dữ liệu!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Không có dữ liệu!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Không có dữ liệu!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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

      if (result) {
        return result;
      } else {
        rejectWithValue("Tải dữ liệu thất bại!");
      }
      // }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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

      if (result) {
        return result;
      } else {
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
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
        rejectWithValue("Tải dữ liệu thất bại!");
      }
    } catch (e) {
      rejectWithValue("Lỗi hệ thống!");
    }
  }
);
