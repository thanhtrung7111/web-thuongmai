import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import {
  loadCUOM,
  loadDcmnSbCd,
  loadDlvrMthd,
  loadDlvrType,
  loadListHour,
  loadLocations,
  loadProduct,
  loadTimeType,
  loadWareHouse,
  loadinpCustOdMtPayMthd2,
  loadLstQUOM,
  loadPmtPmtnPrgr,
  searchProduct,
} from "../actions/commonAction";

const commonSlice = createSlice({
  name: "common",

  initialState: {
    products: {
      actionPending: false,
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstWareHouse: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstLocations: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstCUOM: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstTimeType: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstDlvrType: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstDcmnSbCd: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstDlvrMthd: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstListHour: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstinpCustOdMtPayMthd2: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstQUOM: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
    lstPmtPmtnPrgr: {
      data: null,
      isError: false,
      errorMessage: "",
      isLoading: false,
    },
  },

  reducers: {},

  extraReducers: (builder) => {
    //PRODUCT
    builder
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.products.data = action.payload;
        state.products.errorMessage = "";
        state.products.isError = false;
        state.products.isLoading = false;
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.products.data = null;
        state.products.errorMessage = action.payload;
        state.products.isError = true;
        state.products.isLoading = false;
      })
      .addCase(loadProduct.pending, (state, action) => {
        state.products.data = null;
        state.products.errorMessage = "";
        state.products.isError = false;
        state.products.isLoading = true;
      });

    //SEARCH PRODUCT
    builder
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.products.data = action.payload;
        state.products.errorMessage = "";
        state.products.isError = false;
        state.products.actionPending = false;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.products.data = null;
        state.products.errorMessage = action.payload;
        state.products.isError = true;
        state.products.actionPending = false;
      })
      .addCase(searchProduct.pending, (state, action) => {
        state.products.data = null;
        state.products.errorMessage = "";
        state.products.isError = false;
        state.products.actionPending = true;
      });

    //LOAD WAREHOUSE
    builder
      .addCase(loadWareHouse.pending, (state, action) => {
        state.lstWareHouse.data = null;
        state.lstWareHouse.errorMessage = "";
        state.lstWareHouse.isError = false;
        state.lstWareHouse.isLoading = true;
      })
      .addCase(loadWareHouse.fulfilled, (state, action) => {
        state.lstWareHouse.data = action.payload;
        state.lstWareHouse.errorMessage = "";
        state.lstWareHouse.isError = false;
        state.lstWareHouse.isLoading = false;
      })
      .addCase(loadWareHouse.rejected, (state, action) => {
        state.lstWareHouse.data = null;
        state.lstWareHouse.errorMessage = action.payload;
        state.lstWareHouse.isError = true;
        state.lstWareHouse.isLoading = false;
      });

    //LOAD LOCATIONS

    builder
      .addCase(loadLocations.pending, (state, action) => {
        state.lstLocations.data = null;
        state.lstLocations.isError = false;
        state.lstLocations.errorMessage = "";
        state.lstLocations.isLoading = true;
      })
      .addCase(loadLocations.fulfilled, (state, action) => {
        state.lstLocations.data = action.payload;
        state.lstLocations.isError = false;
        state.lstLocations.errorMessage = "";
        state.lstLocations.isLoading = false;
      })
      .addCase(loadLocations.rejected, (state, action) => {
        state.lstLocations.data = null;
        state.lstLocations.isError = "";
        state.lstLocations.errorMessage = action.payload;
        state.lstLocations.isLoading = false;
      });

    // LOAD CUOM
    builder
      .addCase(loadCUOM.pending, (state, action) => {
        state.lstCUOM.data = null;
        state.lstCUOM.isError = true;
        state.lstCUOM.errorMessage = "";
        state.lstCUOM.isLoading = true;
      })
      .addCase(loadCUOM.fulfilled, (state, action) => {
        state.lstCUOM.data = action.payload;
        state.lstCUOM.isError = false;
        state.lstCUOM.errorMessage = "";
        state.lstCUOM.isLoading = false;
      })
      .addCase(loadCUOM.rejected, (state, action) => {
        state.lstCUOM.data = null;
        state.lstCUOM.isError = true;
        state.lstCUOM.errorMessage = action.payload;
        state.lstCUOM.isLoading = action.payload;
      });

    //LOAD TIMETYPE

    builder
      .addCase(loadTimeType.pending, (state, action) => {
        state.lstTimeType.data = null;
        state.lstTimeType.isError = false;
        state.lstTimeType.errorMessage = "";
        state.lstTimeType.isLoading = true;
      })
      .addCase(loadTimeType.fulfilled, (state, action) => {
        state.lstTimeType.data = action.payload;
        state.lstTimeType.isError = false;
        state.lstTimeType.errorMessage = "";
        state.lstTimeType.isLoading = false;
      })
      .addCase(loadTimeType.rejected, (state, action) => {
        state.lstTimeType.data = null;
        state.lstTimeType.isError = true;
        state.lstTimeType.errorMessage = action.payload;
        state.lstTimeType.isLoading = false;
      });

    // LOAD DLVRTYPE
    builder
      .addCase(loadDlvrType.pending, (state, action) => {
        state.lstDlvrType.data = null;
        state.lstDlvrType.isError = false;
        state.lstDlvrType.errorMessage = "";
        state.lstDlvrType.isLoading = true;
      })
      .addCase(loadDlvrType.fulfilled, (state, action) => {
        state.lstDlvrType.data = action.payload;
        state.lstDlvrType.isError = false;
        state.lstDlvrType.errorMessage = "";
        state.lstDlvrType.isLoading = false;
      })
      .addCase(loadDlvrType.rejected, (state, action) => {
        state.lstDlvrType.data = null;
        state.lstDlvrType.isError = true;
        state.lstDlvrType.errorMessage = action.payload;
        state.lstDlvrType.isLoading = false;
      });

    //LOAD DCMNDBCD

    builder
      .addCase(loadDcmnSbCd.pending, (state, action) => {
        state.lstDcmnSbCd.data = null;
        state.lstDcmnSbCd.isError = false;
        state.lstDcmnSbCd.errorMessage = "";
        state.lstDcmnSbCd.isLoading = true;
      })
      .addCase(loadDcmnSbCd.fulfilled, (state, action) => {
        state.lstDcmnSbCd.data = action.payload;
        state.lstDcmnSbCd.isError = false;
        state.lstDcmnSbCd.errorMessage = "";
        state.lstDcmnSbCd.isLoading = false;
      })
      .addCase(loadDcmnSbCd.rejected, (state, action) => {
        state.lstDcmnSbCd.data = null;
        state.lstDcmnSbCd.isError = true;
        state.lstDcmnSbCd.errorMessage = action.payload;
        state.lstDcmnSbCd.isLoading = false;
      });

    //LOAD DLVRMTD

    builder
      .addCase(loadDlvrMthd.pending, (state, action) => {
        state.lstDlvrMthd.data = null;
        state.lstDlvrMthd.isError = false;
        state.lstDlvrMthd.errorMessage = "";
        state.lstDlvrMthd.isLoading = true;
      })
      .addCase(loadDlvrMthd.fulfilled, (state, action) => {
        state.lstDlvrMthd.data = action.payload;
        state.lstDlvrMthd.isError = false;
        state.lstDlvrMthd.errorMessage = "";
        state.lstDlvrMthd.isLoading = false;
      })
      .addCase(loadDlvrMthd.rejected, (state, action) => {
        state.lstDlvrMthd.data = null;
        state.lstDlvrMthd.isError = true;
        state.lstDlvrMthd.errorMessage = action.payload;
        state.lstDlvrMthd.isLoading = false;
      });

    //LOAD LISTHOUR

    builder
      .addCase(loadListHour.pending, (state, action) => {
        state.lstListHour.data = null;
        state.lstListHour.isError = false;
        state.lstListHour.errorMessage = "";
        state.lstListHour.isLoading = true;
      })
      .addCase(loadListHour.fulfilled, (state, action) => {
        state.lstListHour.data = action.payload;
        state.lstListHour.isError = false;
        state.lstListHour.errorMessage = "";
        state.lstListHour.isLoading = false;
      })
      .addCase(loadListHour.rejected, (state, action) => {
        state.lstListHour.data = null;
        state.lstListHour.isError = true;
        state.lstListHour.errorMessage = action.payload;
        state.lstListHour.isLoading = false;
      });

    //LOAD inpcusodmtpay
    builder
      .addCase(loadinpCustOdMtPayMthd2.pending, (state, action) => {
        state.lstinpCustOdMtPayMthd2.data = null;
        state.lstinpCustOdMtPayMthd2.isError = false;
        state.lstinpCustOdMtPayMthd2.errorMessage = "";
        state.lstinpCustOdMtPayMthd2.isLoading = true;
      })
      .addCase(loadinpCustOdMtPayMthd2.fulfilled, (state, action) => {
        state.lstinpCustOdMtPayMthd2.data = action.payload;
        state.lstinpCustOdMtPayMthd2.isError = false;
        state.lstinpCustOdMtPayMthd2.errorMessage = "";
        state.lstinpCustOdMtPayMthd2.isLoading = false;
      })
      .addCase(loadinpCustOdMtPayMthd2.rejected, (state, action) => {
        state.lstinpCustOdMtPayMthd2.data = null;
        state.lstinpCustOdMtPayMthd2.isError = true;
        state.lstinpCustOdMtPayMthd2.errorMessage = action.payload;
        state.lstinpCustOdMtPayMthd2.isLoading = false;
      });

    //LOAD LSTQUOM
    builder
      .addCase(loadLstQUOM.pending, (state, action) => {
        state.lstQUOM.data = null;
        state.lstQUOM.isError = false;
        state.lstQUOM.errorMessage = "";
        state.lstQUOM.isLoading = true;
      })
      .addCase(loadLstQUOM.fulfilled, (state, action) => {
        state.lstQUOM.data = action.payload;
        state.lstQUOM.isError = false;
        state.lstQUOM.errorMessage = "";
        state.lstQUOM.isLoading = false;
      })
      .addCase(loadLstQUOM.rejected, (state, action) => {
        state.lstQUOM.data = null;
        state.lstQUOM.isError = true;
        state.lstQUOM.errorMessage = action.payload;
        state.lstQUOM.isLoading = false;
      });

    //Load Pmtpmtn

    builder
      .addCase(loadPmtPmtnPrgr.pending, (state, action) => {
        state.lstPmtPmtnPrgr.data = null;
        state.lstPmtPmtnPrgr.isError = false;
        state.lstPmtPmtnPrgr.errorMessage = "";
        state.lstPmtPmtnPrgr.isLoading = true;
      })
      .addCase(loadPmtPmtnPrgr.fulfilled, (state, action) => {
        state.lstPmtPmtnPrgr.data = action.payload;
        state.lstPmtPmtnPrgr.isError = false;
        state.lstPmtPmtnPrgr.errorMessage = "";
        state.lstPmtPmtnPrgr.isLoading = false;
      })
      .addCase(loadPmtPmtnPrgr.rejected, (state, action) => {
        state.lstPmtPmtnPrgr.data = null;
        state.lstPmtPmtnPrgr.isError = true;
        state.lstPmtPmtnPrgr.errorMessage = action.payload;
        state.lstPmtPmtnPrgr.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
