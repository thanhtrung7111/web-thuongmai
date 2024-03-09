import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataDetail, fetchListData, postData } from "../../api/api";

export const getAllOrder = createAsyncThunk(
  "order/list",
  async (data, { rejectWithValue }) => {
    try {
      const listOrder = await fetchListData(data).then(
        (res) => res?.data?.RETNDATA
      );
      //   console.log(listOrder);
      if (listOrder) {
        return listOrder;
      } else {
        return rejectWithValue(listOrder);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const postOrder = createAsyncThunk(
  "order/post",
  async (data, { rejectWithValue }) => {
    try {
      const listOrder = await postData(data).then((res) => res?.data);
      console.log(listOrder);
      if (listOrder) {
        return listOrder;
      } else {
        return rejectWithValue(listOrder);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  "order/detail",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchDataDetail(data).then((res) => res?.data);
      console.log(result);
      if (result) {
        return result;
      } else {
        return rejectWithValue(result);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
