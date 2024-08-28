import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { errorServerOn } from "../reducer/exceptionReducer";

const axiosBaseQuery = fetchBaseQuery({
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
    console.log(data);
    return defaultValue;
  }
  return data.RETNDATA;
};

export const imageApiSlice = createApi({
  reducerPath: "imageApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["Images"],
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    fetchImage: builder.query({
      query: ({ id, url }) => ({
        url: url,
        method: "GET",
        responseHandler: async (response) => {
          const blob = await response.blob();
          return blob;
        },
      }),
      providesTags: (result, error, { id, url }) => [{ type: "Images", id }],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          //   console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLazyFetchImageQuery, useFetchImageQuery } = imageApiSlice;
