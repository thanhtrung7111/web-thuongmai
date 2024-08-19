import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchDataCommon, fetchLocationData } from "../../api/api";
import axios from "axios";

const axiosBaseQuery = async ({ data }) => {
  try {
    const result = await fetchDataCommon(data);
    return {
      data: result.data?.RETNDATA,
    };
  } catch (error) {
    return { error: { data: error.message || "An error occurred" } };
  }
};

export const commonApiSlice = createApi({
  reducerPath: "commonApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: (data) => ({
        data,
      }),
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
            const {data} = await queryFulfilled;
            dispatch(commonApiSlice.updateQueryData("fetchProducts",undefined,))
        } catch (error) {
            
        }
      }
    }),
    fetchProducts: builder.query({
      query: () => "",
      providesTags: ["Products"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetProductsMutation, useFetchProductsQuery } = commonApiSlice;
