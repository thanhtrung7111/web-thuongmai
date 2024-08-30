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
        return rejectWithValue("Không tải được dữ liệu!");
      }
    } catch (error) {
      rejectWithValue("Lỗi hệ thống!");
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
        return result?.RETNDATA[0];
      } else {
        return rejectWithValue("Không tải được dữ liệu!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);
