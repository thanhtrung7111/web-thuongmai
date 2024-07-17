import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteData,
  fetchDataCommon,
  postData,
  updateData,
} from "../../api/api";
import { update } from "firebase/database";
export const loadCart = createAsyncThunk(
  "cart/load",
  async (data, { rejectWithValue }) => {
    let productCarts = [];
    productCarts = await fetchDataCommon(data);
    return productCarts;
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const result = await postData({
        DCMNCODE: "APPCARTPRDC",
        HEADER: [{ ...data }],
      });
      console.log(result);
      if (result?.data.RETNCODE !== false) {
        return result?.data?.RETNDATA[0];
      } else {
        return rejectWithValue("Thêm sản phẩm thất bại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const updateAmountProduct = createAsyncThunk(
  "cart/updateAmountProduct",
  async (data, { rejectWithValue }) => {
    try {
      const result = await updateData(data);
      if (result?.data?.RETNCODE) {
        return result?.data?.RETNDATA[0];
      } else {
        return rejectWithValue("Cập nhật thất bại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const increamentAmountProduct = createAsyncThunk(
  "cart/increamentAmoutProduct",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const result = await updateData(data);
      if (result?.data?.RETNCODE == true) {
        console.log(result);
        return data;
      } else {
        return rejectWithValue("Cập nhật thất bại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);
export const decreamentAmountProduct = createAsyncThunk(
  "cart/decreamentAmountProduct",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const result = await updateData(data);
      if (result?.data?.RETNCODE == true) {
        return data;
      } else {
        return rejectWithValue("Cập nhật thất bại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const changeAmoutProduct = createAsyncThunk(
  "cart/changeAmoutProduct",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const result = await updateData(data);
      if (result?.data?.RETNCODE == true) {
        return data;
      } else {
        return rejectWithValue("Cập nhật thất bại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);
export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const result = await deleteData({
        DCMNCODE: "appCartPrdc",
        KEY_CODE: data.id,
      });
      console.log(result);
      if (result?.data?.RETNCODE == true) {
        return data;
      } else {
        return rejectWithValue("Xóa thất bại!");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);
