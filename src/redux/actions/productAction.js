import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchDataDetail } from "../../api/api";

export const fetchProductDetail = createAsyncThunk(
  "product/detail",
  async (data, { rejectWithValue }) => {
    try {
      const productDetail = await fetchDataDetail(data);
      if (productDetail) {
        return productDetail;
      } else {
        rejectWithValue(productDetail);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
