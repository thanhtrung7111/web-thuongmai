import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { errorServerOn } from "../reducer/exceptionReducer";
import { apiQueue } from "./commonQuery";

const axiosBaseQuery = fetchBaseQuery({
  // baseUrl: "/api",
  baseUrl: import.meta.env.VITE_INVOICE_URL,
  timeout: 15000,
});

const response = async (data, dispatch) => {
  console.log(data);
  if (data?.RETNCODE == false) {
    dispatch(errorServerOn({ message: data.RETNMSSG }));
    // console.log();
    toast.error(data.RETNMSSG, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
    return [];
  }
  return data.RETNDATA;
};

export const invoiceApiSlice = createApi({
  reducerPath: "invoiceApi",
  baseQuery: axiosBaseQuery,
  refetchOnFocus: true,
  keepUnusedDataFor: 7200,
  tagTypes: ["invoices"],
  endpoints: (builder) => ({
    loginInvoice: builder.mutation({
      queryFn: async (data, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/auth/login",
            method: "POST",
            body: data,
          })
        );
      },
    }),
    extractInvoice: builder.mutation({
      queryFn: async (
        { data, taxCode, token },
        _api,
        _extraOptions,
        fetchWithBQ
      ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url:
              "/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/createInvoice/" +
              taxCode,
            method: "POST",
            body: data,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Nếu cần
            },
          })
        );
      },
    }),
    getInvoice: builder.mutation({
      queryFn: async ({ data, token }, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getInvoiceRepresentationFile",
            method: "POST",
            body: { ...data },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Nếu cần
            },
          })
        );
      },
    }),
  }),
});

export const {
  useLoginInvoiceMutation,
  useExtractInvoiceMutation,
  useGetInvoiceMutation,
} = invoiceApiSlice;
