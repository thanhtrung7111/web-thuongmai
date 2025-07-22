import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorServerOn } from "../reducer/exceptionReducer";
import { toast } from "react-toastify";
import { apiQueue } from "./commonQuery";

const axiosBaseQuery = fetchBaseQuery({
  // baseUrl: "/api",
  baseUrl: import.meta.env.VITE_API_URL,
  timeout: 10000,
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

const response = async (data, dispatch, defaultValue = []) => {
  if (data?.RETNCODE == false) {
    await dispatch(errorServerOn({ message: data.RETNMSSG }));
    toast.error(data.RETNMSSG, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
    return defaultValue;
  }
  return data.RETNDATA;
};

export const detailApiSlice = createApi({
  reducerPath: "detailApi",
  baseQuery: axiosBaseQuery,
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  tagTypes: ["ProductDetail", "OrderDetail"],
  endpoints: (builder) => ({
    fetchDetailProduct: builder.mutation({
      queryFn: async (data, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA005",
            method: "POST",
            body: data,
          })
        );
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const listData = await response(data, dispatch, null);
          return listData;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useFetchDetailProductMutation } = detailApiSlice;
