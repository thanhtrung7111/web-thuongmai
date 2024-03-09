import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
export const loadCart = createAsyncThunk(
  "cart/load",
  async (data, { rejectWithValue }) => {
    let productCarts = [];
    productCarts = await axios
      .get("https://fakestoreapi.com/products")
      .then((reponse) => reponse.data)
      .catch((e) => console.log(e));
    return [];
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    return data;
  }
);

export const increamentAmountProduct = createAsyncThunk(
  "cart/increamentAmoutProduct",
  async (data, { rejectWithValue }) => {
    return data;
  }
);
export const decreamentAmountProduct = createAsyncThunk(
  "cart/decreamentAmountProduct",
  async (data, { rejectWithValue }) => {
    return data;
  }
);
export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (data, { rejectWithValue }) => {
    return data;
  }
);
