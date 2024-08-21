import { createAsyncThunk } from "@reduxjs/toolkit";
import { users } from "../../data";
import { fetchLocationData, loginCustom } from "../../api/api";

// export const initialApp = createAsyncThunk(
//   "user/initial",
//   async (data, { rejectWithValue }) => {
//     try {
//       const user = await loginCustom(data)
//         .then((response) => response?.data?.RETNDATA)
//         .catch((e) => e);
//       console.log(user);
//       if (user) {
//         return user;
//       } else {
//         return rejectWithValue("Lỗi đăng nhập!");
//       }
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue("Lỗi đăng nhập!");
//     }
//   }
// );

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const user = await loginCustom(data)
        .then((response) => response?.data?.RETNDATA)
        .catch((e) => e);
      console.log(user);
      if (user) {
        return user;
      } else {
        return rejectWithValue("Lỗi đăng nhập!");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Lỗi đăng nhập!");
    }
  }
);
export const loginLCTN = createAsyncThunk(
  "user/loginLCTN",
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchLocationData(data)
        .then((response) => {
          console.log(response?.data);
          return response?.data?.RETNDATA;
        })
        .catch((e) => console.log(e));
      console.log(result);
      if (result) {
        return result;
      } else {
        console.log(result);
        return rejectWithValue("Lỗi hệ thống!");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);
