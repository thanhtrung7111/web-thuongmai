import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorServerOn } from "../reducer/exceptionReducer";
import { toast } from "react-toastify";
import {
  loginSuccess,
  saveLocations,
  saveTokenInitial,
  saveTokenLocation,
  saveTokenUser,
} from "../reducer/userReducer";

const axiosBaseQuery = fetchBaseQuery({
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
    console.log(data);
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
          const listData = await response(data, dispatch, null);
          console.log(listData);
          dispatch(
            authApiSlice.util.updateQueryData(
              "fetchInitialToken",
              undefined,
              (draft) => {
                sessionStorage.setItem("tokenInitial", listData?.TOKEN);
                console.log(listData?.TOKEN);
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
          const listData = await response(data, dispatch, null);
          // console.log(listData.COMPLIST);
          if (listData != null) {
            sessionStorage.setItem("tokenUser", listData.TOKEN);
            // console.log(listData.USERLGIN);
            dispatch(loginSuccess({ user: listData.USERLGIN }));
            dispatch(saveTokenUser({ token: listData.TOKEN }));
            dispatch(saveLocations({ locations: listData?.COMPLIST }));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginLCTN: builder.mutation({
      query: (credential) => ({
        url: "/Api/data/runApi_Syst?run_Code=SYS006",
        method: "POST",
        body: credential,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            dispatch(saveTokenLocation({ token: listData.TOKEN }));
            sessionStorage.setItem("tokenLocation", listData.TOKEN);
            console.log(listData);
          }
          return listData;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    registerAccount: builder.mutation({
      query: (credential) => ({
        url: "/Api/data/runApi_Syst?run_Code=SYS007",
        method: "POST",
        body: credential,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            dispatch(saveTokenLocation({ token: listData.TOKEN }));
            sessionStorage.setItem("tokenLocation", listData.TOKEN);
            console.log(listData);
          }
          return listData;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  }),
});

export const {
  useFetchInitialTokenQuery,
  useLoginMutation,
  useLoginLCTNMutation,
} = authApiSlice;
