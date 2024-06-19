import { createAsyncThunk } from "@reduxjs/toolkit";
import { users } from "../../data";
import { fetchLocationData, loginCustom } from "../../api/api";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const user = await loginCustom(data)
        .then((response) => response?.data?.RETNDATA)
        .catch((e) => e);
      // console.log(user);
      if (user) {
        return user;
      } else {
        // console.log("Sa");
        return rejectWithValue("Người dùng không tồn tại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi đăng nhập");
    }
  }
);
export const loginLCTN = createAsyncThunk(
  "user/loginLCTN",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchLocationData(data)
        .then((response) => response?.data?.RETNDATA)
        .catch((e) => e);
      // console.log(result);
      if (result) {
        return result;
      } else {
        // console.log("Sa");
        return rejectWithValue("Người dùng không tồn tại!");
      }
    } catch (error) {
      return rejectWithValue("Lỗi");
    }
  }
);
