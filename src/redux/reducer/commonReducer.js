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
} from "../actions/commonAction";

const commonSlice = createSlice({
  name: "common",

  initialState: {
    isLoadingCommon: true,
    errorMessageCommon: false,
    products: null,
    lstWareHouse: [],
    lstLocations: [],
    lstCUOM: [],
    lstTimeType: [],
    lstDlvrType: [],
    lstDcmnSbCd: [],
    lstDlvrMthd: [],
    lstListHour: [],
    lstinpCustOdMtPayMthd2: [],
    lstQUOM: [],
    lstPmtPmtnPrgr: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      console.log(action.payload);
      // console.log(cache.match(data));
    });

    builder.addCase(loadWareHouse.fulfilled, (state, action) => {
      state.lstWareHouse = action.payload;
    });
    builder.addCase(loadLocations.fulfilled, (state, action) => {
      state.lstLocations = action.payload;
    });
    builder.addCase(loadCUOM.fulfilled, (state, action) => {
      state.lstCUOM = action.payload;
    });
    builder.addCase(loadTimeType.fulfilled, (state, action) => {
      state.lstTimeType = action.payload;
    });
    builder.addCase(loadDlvrType.fulfilled, (state, action) => {
      state.lstDlvrType = action.payload;
    });
    builder.addCase(loadDcmnSbCd.fulfilled, (state, action) => {
      state.lstDcmnSbCd = action.payload;
    });
    builder.addCase(loadDlvrMthd.fulfilled, (state, action) => {
      state.lstDlvrMthd = action.payload;
    });
    builder.addCase(loadListHour.fulfilled, (state, action) => {
      state.lstListHour = action.payload;
    });
    builder.addCase(loadinpCustOdMtPayMthd2.fulfilled, (state, action) => {
      state.lstinpCustOdMtPayMthd2 = action.payload;
    });
    builder.addCase(loadLstQUOM.fulfilled, (state, action) => {
      state.lstQUOM = action.payload;
    });
    builder.addCase(loadPmtPmtnPrgr.fulfilled, (state, action) => {
      state.lstPmtPmtnPrgr = action.payload;
    });

    builder.addMatcher(isPending, (state) => {
      state.isLoadingCommon = true;
      state.errorMessageCommon = false;
    });

    builder.addMatcher(isFulfilled, (state) => {
      state.isLoadingCommon = false;
      state.errorMessageCommon = false;
    });
    builder.addMatcher(isRejected, (state) => {
      state.isLoadingCommon = false;
      state.errorMessageCommon = true;
    });
  },
});

export const commonReducer = commonSlice.reducer;
