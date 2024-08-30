import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { errorServerOn } from "../reducer/exceptionReducer";

const axiosBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  timeout: 15000,
  prepareHeaders: (headers) => {
    headers.set(
      "token",
      sessionStorage.getItem("tokenLocation") ||
        sessionStorage.getItem("tokenUser") ||
        sessionStorage.getItem("tokenInitial")
    );
    return headers;
  },
});

const response = async (data, dispatch) => {
  console.log(data);
  if (data?.RETNCODE == false) {
    dispatch(errorServerOn({ message: data.RETNMSSG }));
    // console.log();
    toast.error(data.RETNMSSG, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
    return [];
  }
  return data.RETNDATA;
};

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: axiosBaseQuery,
  refetchOnFocus: true,
  keepUnusedDataFor: 7200,
  endpoints: (builder) => ({
    postNewOrder: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA007",
        method: "POST",
        body: {
          DCMNCODE: "DDHKH",
          HEADER: [{ ...data }],
        },
      }),
    }),
  }),
});

export const { usePostNewOrderMutation } = orderApiSlice;
