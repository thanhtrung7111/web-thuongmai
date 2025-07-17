import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { errorServerOn } from "../reducer/exceptionReducer";
import CryptoJS from "crypto-js";
import PQueue from "p-queue";

const encryptAES = (path) => {
  return CryptoJS.AES.encrypt(path, secretKey).toString();
};
export const apiQueue = new PQueue({ concurrency: 4 });
const axiosBaseQuery = fetchBaseQuery({
  // baseUrl: "/api",
  baseUrl: import.meta.env.VITE_API_URL,
  timeout: 15000,
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

const response = async (data, dispatch) => {
  console.log(data);
  if (data?.RETNCODE == false || data?.RETNDATA == null) {
    dispatch(errorServerOn({ message: "Lỗi server" }));
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

export const commonApiSlice = createApi({
  reducerPath: "commonApi",
  baseQuery: axiosBaseQuery,
  tagTypes: [
    "lstProduct",
    "lstWareHouse",
    "lstLocation",
    "lstCUOM",
    "lstTimeType",
    "lstDlvrType",
    "lstDcmnSbCd",
    "lstDlvrMthd",
    "lstListHour",
    "lst_inpCustOdMt_Pay_Mthd_2",
    "lstQUOM",
    "pmtPmtnPrgr",
    "lstCustomerGroup",
    "lstProvince",
    "lstDistrict",
    "lstWard",
    "lstMaktStdr",
    "inpBanner",
    "lstBannerType",
    "lstBannerDataType",
  ],
  keepUnusedDataFor: 7200,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
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
          })
        );
      },
      providesTags: ["lstProduct"],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          console.log("Hello");
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchProducts",
              undefined,
              (draft) => {
                return listData?.filter(
                  (item) =>
                    item.PRDCNAME.toLowerCase().indexOf("tấm trần pima") >= 0
                );
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchWareHouse: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstWareHouse",
            },
          })
        );
      },
      providesTags: ["lstWareHouse"],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchWareHouse",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchLocation: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstLocation",
            },
          })
        );
      },
      providesTags: "lstLocation",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchLocation",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchCUOM: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstCUOM",
            },
          })
        );
      },
      providesTags: "lstCUOM",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchCUOM",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchTimeType: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstTimeType",
            },
          })
        );
      },
      providesTags: "lstTimeType",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchTimeType",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchDlvrType: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstDlvrType",
            },
          })
        );
      },
      providesTags: "lstDlvrType",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchDlvrType",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchDCmnSbcd: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstDcmnSbCd",
            },
          })
        );
      },
      providesTags: "lstDcmnSbCd",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchDCmnSbcd",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchDlvrMthd: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstDlvrMthd",
            },
          })
        );
      },
      providesTags: "lstDlvrMthd",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchDlvrMthd",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchListHour: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstListHour",
            },
          })
        );
      },
      providesTags: "lstListHour",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchListHour",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchInpCustOdMtPayMthd2: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lst_inpCustOdMt_Pay_Mthd_2",
            },
          })
        );
      },
      providesTags: "lst_inpCustOdMt_Pay_Mthd_2",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchInpCustOdMtPayMthd2",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchQUOM: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstQUOM ",
            },
          })
        );
      },
      providesTags: "lstQUOM",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchQUOM",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchPmtPmtnPrgr: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA017",
            method: "POST",
            body: {
              DCMNCODE: "pmtPmtnPrgr",
              LCTNCODE: "001",
              LGGECODE: "{{0302}}",
              BEG_DATE: "1990-01-01",
              PARA_001: "1",
              PARA_002: "%",
              PARA_003: "2",
              PARA_004: "%",
              PARA_005: "2",
            },
          })
        );
      },
      providesTags: "pmtPmtnPrgr",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchPmtPmtnPrgr",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchCustomerGroup: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstCustomerGroup",
            },
          })
        );
      },
      providesTags: "lstCustomerGroup",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            dispatch(
              commonApiSlice.util.updateQueryData(
                "fetchCustomerGroup",
                undefined,
                (draft) => {
                  return listData;
                }
              )
            );
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchMaktStdr: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstMaktStdr",
            },
          })
        );
      },
      providesTags: " lstMaktStdr",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            dispatch(
              commonApiSlice.util.updateQueryData(
                "fetchMaktStdr",
                undefined,
                (draft) => {
                  return listData;
                }
              )
            );
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchProvince: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstProvince",
            },
          })
        );
      },
      providesTags: "lstProvince",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            dispatch(
              commonApiSlice.util.updateQueryData(
                "fetchProvince",
                undefined,
                (draft) => {
                  return listData;
                }
              )
            );
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchDistrict: builder.mutation({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstDistrict",
              CONDFLTR: "PrvnCode='" + provinceCode + "'",
            },
          })
        );
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            return listData;
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchWard: builder.mutation({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: {
              LISTCODE: "lstWard",
              CONDFLTR: "DistCode='" + districtCode + "'",
            },
          })
        );
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch, null);
          if (listData != null) {
            return listData;
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchBanner: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA004",
            method: "POST",
            body: {
              DCMNCODE: "inpBanner",
              // PARACODE: "001",
              LCTNCODE: "001",
              CURRDATE: "2024-09-17",
              CUSTCODE: "%",
              SHOPCODE: "%",
              KEY_WORD: "%",
            },
          })
        );
      },
      providesTags: "inpBanner",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchBanner",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchBannerType: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: { LISTCODE: "lstBannerType", CONDFLTR: "" },
          })
        );
      },
      providesTags: "lstBannerType",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchBannerType",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    fetchBannerDataType: builder.query({
      queryFn: async (_arg, _api, _extraOptions, fetchWithBQ) => {
        return apiQueue.add(() =>
          fetchWithBQ({
            url: "/Api/data/runApi_Data?run_Code=DTA002",
            method: "POST",
            body: { LISTCODE: "lstBannerDataType", CONDFLTR: "" },
          })
        );
      },
      providesTags: "lstBannerDataType",
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const listData = await response(data, dispatch);
          dispatch(
            commonApiSlice.util.updateQueryData(
              "fetchBannerDataType",
              undefined,
              (draft) => {
                return listData;
              }
            )
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProvinceQuery,
  useFetchDistrictMutation,
  useFetchWardMutation,
  useFetchWareHouseQuery,
  useFetchLocationQuery,
  useFetchCUOMQuery,
  useFetchTimeTypeQuery,
  useFetchDlvrTypeQuery,
  useFetchDCmnSbcdQuery,
  useFetchDlvrMthdQuery,
  useFetchListHourQuery,
  useFetchInpCustOdMtPayMthd2Query,
  useFetchQUOMQuery,
  useFetchMaktStdrQuery,
  useFetchBannerQuery,
  useFetchBannerDataTypeQuery,
  useFetchBannerTypeQuery,
  useLazyFetchCUOMQuery,
  useLazyFetchDCmnSbcdQuery,
  useLazyFetchDlvrMthdQuery,
  useLazyFetchDlvrTypeQuery,
  useLazyFetchInpCustOdMtPayMthd2Query,
  useLazyFetchListHourQuery,
  useLazyFetchLocationQuery,
  useLazyFetchPmtPmtnPrgrQuery,
  useLazyFetchProductsQuery,
  useLazyFetchQUOMQuery,
  useLazyFetchTimeTypeQuery,
  useLazyFetchWareHouseQuery,
  useLazyFetchMaktStdrQuery,
} = commonApiSlice;
