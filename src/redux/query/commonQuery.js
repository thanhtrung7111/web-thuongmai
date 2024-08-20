import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api, fetchDataCommon, fetchLocationData } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

const axiosBaseQuery = fetchBaseQuery({
  baseUrl: "https://api-dev.firstems.com",
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

export const commonApiSlice = createApi({
  reducerPath: "commonApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["Products"],
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => ({
        url: "/Api/data/runApi_Data?run_Code=DTA004",
        method: "POST",
        body: {
          DCMNCODE: "appPrdcList",
          PARACODE: "001",
          LCTNCODE: "001",
          LGGECODE: "{{0302}}",
          SCTNCODE: 1,
          JSTFDATE: "1990-01-01",
          KEY_WORD: "%",
          SHOPCODE: "%",
          CUSTCODE: "%",
          reload: true,
        },
      }),
      providesTags: ["Products"],
      transformResponse: (res) => {
        console.log(res);
        if (res?.RETNDATA) {
          return res?.RETNDATA.filter(
            (item) => item.PRDCNAME.toLowerCase().indexOf("tấm trần pima") >= 0
          );
        } else {
          return [];
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetProductsMutation, useFetchProductsQuery } = commonApiSlice;
