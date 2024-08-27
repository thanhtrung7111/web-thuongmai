import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import session from "redux-persist/lib/storage/session";
import { errorServerOn } from "../reducer/exceptionReducer";
import { toast } from "react-toastify";

const axiosBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  timeout: 10000,
  prepareHeaders: (headers) => {
    headers.set(
      "token",
      sessionStorage.getItem("tokenLocation") ||
        session.getItem("tokenUser") ||
        session.getItem("tokenInitial")
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
  reducerPath: "detailItemApi",
  baseQuery: axiosBaseQuery,
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  tagTypes: ["ProductDetail", "OrderDetail"],
  endpoints: (builder) => ({
    fetchDetailProduct: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA005",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = response(data, dispatch, null);
          return listData;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useFetchDetailProductMutation } = detailApiSlice;
