import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const evaluateApiSlice = createApi({
  reducerPath: "evaluateApi",
  baseQuery: axiosBaseQuery,
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  tagTypes: ["Evaluates"],
  endpoints: (builder) => ({
    fetchEvaluate: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA004",
        method: "POST",
        body: {
          DCMNCODE: "INPMARKESTM",
          // "PARACODE": "<Mã tham số> ",
          CONDFLTR: "PRDCCODE = '" + data + "'",
          PAGELINE: "0",
          PAGENUMB: "1",
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    postEvaluate: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA007",
        method: "POST",
        body: {
          DCMNCODE: "INPMARKESTM",
          HEADER: [{ ...data }],
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useFetchEvaluateMutation, usePostEvaluateMutation } =
  evaluateApiSlice;
