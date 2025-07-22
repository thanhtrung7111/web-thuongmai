import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiQueue } from "./commonQuery";

const axiosBaseQuery = fetchBaseQuery({
  baseUrl: "",
  timeout: 15000,
});
export const qrApiSlice = createApi({
  reducerPath: "qrAPI",
  refetchOnFocus: true,
  baseQuery: axiosBaseQuery,
  keepUnusedDataFor: 7200,
  endpoints: (builder) => ({
    generateQR: builder.mutation({
      queryFn: async (data, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "https://api.vietqr.io/v2/generate",
            method: "POST",
            body: data,
            headers: {
              "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
              "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
            },
          })
        );
      },
    }),
  }),
});
export const { useGenerateQRMutation } = qrApiSlice;
