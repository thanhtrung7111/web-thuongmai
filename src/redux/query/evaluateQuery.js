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
      queryFn: async (data, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA004",
            method: "POST",
            body: {
              DCMNCODE: "INPMARKESTM",
              CONDFLTR: "PRDCCODE = '" + data + "'",
              PAGELINE: "0",
              PAGENUMB: "1",
            },
          })
        );
      },
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
      queryFn: async (data, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA007",
            method: "POST",
            body: {
              DCMNCODE: "INPMARKESTM",
              HEADER: [{ ...data }],
            },
          })
        );
      },
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
