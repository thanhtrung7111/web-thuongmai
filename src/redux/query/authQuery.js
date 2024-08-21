import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorServerOn } from "../reducer/exceptionReducer";
import { toast } from "react-toastify";
import {
  loginSuccess,
  saveTokenInitial,
  saveTokenUser,
} from "../reducer/userReducer";

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

const response = (data, dispatch, defaultValue = []) => {
  if (data?.RETNCODE == false) {
    dispatch(errorServerOn({ message: data.RETNMSSG }));
    toast.error(data.RETNMSSG, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
    return defaultValue;
  }
  return data.RETNDATA;
};

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery,
  keepUnusedDataFor: 0,
  tagTypes: ["currentUser", "initialToken", "userToken", "locationToken"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    fetchInitialToken: builder.query({
      query: () => ({
        url: "/Api/data/runApi_Syst?run_Code=SYS001",
        method: "POST",
        body: {
          COMPCODE: "PMC",
          APP_CODE: "AER",
          SYSTCODE: 4,
        },
      }),
      providesTags: ["initialToken"],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = response(data, dispatch, null);
          dispatch(
            authApiSlice.util.updateQueryData(
              "fetchInitialToken",
              undefined,
              (draft) => {
                sessionStorage.setItem("tokenInitial", listData?.TOKEN);
                return listData?.TOKEN;
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (credential) => ({
        url: "/Api/data/runApi_Syst?run_Code=SYS010",
        method: "POST",
        body: credential,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = response(data, dispatch, null);
          if (listData != null) {
            sessionStorage.setItem("tokenUser", listData.TOKEN);
            dispatch(loginSuccess({ user: listData.USERLGIN }));
            dispatch(saveTokenUser({ token: listData.TOKEN }));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useFetchInitialTokenQuery, useLoginMutation } = authApiSlice;
