import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addCartByUser,
  changeActionCart,
  deleteCartByUser,
  loadCartByUser,
  updateCartByUser,
} from "../reducer/cartReducer";

const axiosBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
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

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery: axiosBaseQuery,
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  tagTypes: ["Carts"],
  endpoints: (builder) => ({
    fetchCart: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA004",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          console.log(listData);
          if (listData != null) {
            dispatch(loadCartByUser({ list: listData }));
          }
        } catch (error) {}
      },
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA007",
        method: "POST",
        body: {
          DCMNCODE: "APPCARTPRDC",
          HEADER: [{ ...data }],
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          console.log(listData);
          if (listData != null) {
            dispatch(addCartByUser({ product: listData[0] }));
            dispatch(
              changeActionCart({ action: "addproduct" + listData[0].PRDCCODE })
            );
          }
        } catch (error) {}
      },
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA008",
        method: "POST",
        body: {
          DCMNCODE: "APPCARTPRDC",
          HEADER: [
            {
              ...data,
            },
          ],
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          console.log(listData);
          if (listData != null) {
            dispatch(updateCartByUser({ product: listData[0] }));
            dispatch(
              changeActionCart({
                action:
                  "update:" +
                  listData[0].PRDCCODE +
                  " QUOMQTTY: " +
                  listData[0].QUOMQTTY,
              })
            );
          }
        } catch (error) {}
      },
    }),
    deleteCart: builder.mutation({
      query: (data) => ({
        url: "/Api/data/runApi_Data?run_Code=DTA009",
        method: "POST",
        body: { DCMNCODE: "appCartPrdc", KEY_CODE: data.id },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          console.log(listData);
          if (listData != null) {
            dispatch(deleteCartByUser({ product: args }));
            dispatch(
              changeActionCart({
                action:
                  "deleteproduct:" +
                  args.PRDCCODE +
                  " QUOMQTTY: " +
                  args.QUOMQTTY,
              })
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useFetchCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useAddToCartMutation,
} = cartApiSlice;
