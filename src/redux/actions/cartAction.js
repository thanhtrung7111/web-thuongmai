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
    const result = await postData({
      DCMNCODE: "APPCARTPRDC",
      HEADER: [{ ...data }],
    });
    if (result?.data.RETNCODE !== false) {
      return result?.data?.RETNDATA[0];
    } else {
      return rejectWithValue(data);
    }
  }
);

export const updateAmountProduct = createAsyncThunk(
  "cart/updateAmountProduct",
  async (data, { rejectWithValue }) => {
    const result = await updateData(data);
    if (result?.data?.RETNCODE) {
      return result?.data?.RETNDATA[0];
    } else {
      return rejectWithValue(data);
    }
  }
);

export const increamentAmountProduct = createAsyncThunk(
  "cart/increamentAmoutProduct",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const result = await updateData(data);
    if (result?.data?.RETNCODE == true) {
      console.log(result);
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const decreamentAmountProduct = createAsyncThunk(
  "cart/decreamentAmountProduct",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const result = await updateData(data);
    if (result?.data?.RETNCODE == true) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);

export const changeAmoutProduct = createAsyncThunk(
  "cart/changeAmoutProduct",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const result = await updateData(data);
    if (result?.data?.RETNCODE == true) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const result = await deleteData({
      DCMNCODE: "appCartPrdc",
      KEY_CODE: data.id,
    });
    if (result?.data.RETNCODE == true) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
