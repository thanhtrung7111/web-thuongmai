import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../Wrapper";
import Asus from "../../assets/img/asus.jpg";
import ProductSlider from "../ProductSlider";
import InfoPage from "../InfoPage";
import { useDispatch, useSelector } from "react-redux";
import Combobox from "../Combobox";
import Input from "../Input";
import DatePicker from "../DatePicker";
import moment from "moment";
import TextArea from "../TextArea";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { postOrder } from "../../redux/actions/orderActions";
import ImageFetch from "../ImageFetch";
import { useNavigate } from "react-router-dom";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-hex";
import LoadingView from "../../pages/LoadingView";
import axios from "axios";
import { HmacSHA256 } from "crypto-js";
import VietQRComponent from "./VietQRComponent";
import VNPay from "../../assets/img/vnpay.png";
import VietQR from "../../assets/img/vietqr.png";
// import { closeBlock, openBlock } from "../../redux/reducer/popupReducer";
import { toast } from "react-toastify";
import { base64StringToBlob } from "blob-util";
import { postData } from "../../api/api";
import TableDetailProduct from "./TableDetailProduct";
import InputFormikForm from "../formikCustomForm/InputFormikForm";
import {
  useFetchCUOMQuery,
  useFetchDCmnSbcdQuery,
  useFetchDlvrMthdQuery,
  useFetchDlvrTypeQuery,
  useFetchInpCustOdMtPayMthd2Query,
  useFetchListHourQuery,
  useFetchTimeTypeQuery,
  useFetchWareHouseQuery,
} from "../../redux/query/commonQuery";
import {
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "../../redux/query/cartQuery";
import ButtonForm from "../commonForm/ButtonForm";
import ProductSuggestion from "../productsuggestion/ProductSuggestion";
import DatePickerFormikForm from "../formikCustomForm/DatePickerFormikForm";
import SelectFormikForm from "../formikCustomForm/SelectFormikForm";
import NumberFormikForm from "../formikCustomForm/NumberFormikForm";
import TextareaFormikForm from "../formikCustomForm/TextareaFormikForm";
const PayDetailComponent = () => {
  const {
    data: lstWareHouse,
    isLoading: isLoadingWareHouse,
    isError: isErrorWareHouse,
  } = useFetchWareHouseQuery();
  const {
    data: lstCUOM,
    isLoading: isLoadingCUOM,
    isError: isErrorCUOM,
  } = useFetchCUOMQuery();
  const {
    data: lstDcmnSbCd,
    isLoading: isLoadingDcmnSbCd,
    isError: isErrorDcmnSbCd,
  } = useFetchDCmnSbcdQuery();
  const {
    data: lstDlvrMthd,
    isLoading: isLoadingDlvrMthd,
    isError: isErrorDlvrMthd,
  } = useFetchDlvrMthdQuery();
  const {
    data: lstDlvrType,
    isLoading: isLoadingDlvrType,
    isError: isErrorDlvrType,
  } = useFetchDlvrTypeQuery();
  const {
    data: lstListHour,
    isLoading: isLoadingListHour,
    isError: isErrorListHour,
  } = useFetchListHourQuery();
  const {
    data: lstinpCustOdMtPayMthd2,
    isLoading: isLoadingInpCustOdMtPayMthd,
    isError: isErrorInpCustOdMtPayMthd,
  } = useFetchInpCustOdMtPayMthd2Query();
  const {
    data: lstTimeType,
    isLoading: isLoadingTimeType,
    isError: isErrorTimeType,
  } = useFetchTimeTypeQuery();
  const [
    updateCart,
    {
      data: updateCartData,
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateCartMutation();
  const [
    deleteCart,
    {
      data: deleteCartData,
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteCartMutation();
  const { actionCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateButton, setStateButton] = useState("");
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [openVietQR, setOpenVietQR] = useState(false);
  const [infoVietQR, setInfoVietQR] = useState(null);
  const [initialValue, setInitialValue] = useState({
    COMPCODE: "PMC", //Công ty
    LCTNCODE: "001", //Chi nhánh
    DCMNSBCD: lstDcmnSbCd?.length > 0 ? lstDcmnSbCd?.at(0)?.ITEMCODE : "", // phân loại
    ODERCODE: "", //Mã đơn hàng
    ODERDATE: { startDate: new Date() }, //Ngày đơn hàng
    CUSTCODE: currentUser?.CUSTCODE, //Mã khách hàng
    MCUSTNME: currentUser?.CUSTNAME, //Tên khách hàng
    CUSTADDR: currentUser?.CUSTADDR, //Địa chỉ khách hàng
    CUST_TEL: currentUser?.USER_TEL, //Số điệnt thoại khách hàng
    NOTETEXT: "", //Diễn giải
    SUM_CRAM: 0, //Tổng tiền
    SMPRQTTY: 0, //Tổng số lượng
    RDTNRATE: 0, //%Chiết khấu
    RDTNCRAM: 0, //Tiền chiết khấu
    CSCMRATE: 0, //Huê hồng khách hàng
    TAX_CODE: "", //Mã số thuế
    VAT_RATE: 0, //THuế suất
    VAT_CRAM: 0, //Tiền thuế
    DLVRMTHD: lstDlvrMthd?.length > 0 ? lstDlvrMthd?.at(0)?.ITEMCODE : "", //Phương thức giao hàng
    DLVRTYPE: lstDlvrType?.length > 0 ? lstDlvrType?.at(0)?.ITEMCODE : "", //PHương thức vận chuyển
    DLVRDATE: moment(new Date()).format("yyyy-MM-DD"), //Ngày giao hàng
    DLVRHOUR: lstListHour?.length > 0 ? lstListHour?.at(0)?.ITEMCODE : "", //Giờ giao hàng
    DLVRPLCE: "", //Nơi giao hàng
    DLVRADDR: "", //Địa chỉ giao
    RCVREMPL: "", //Người nhận hàng
    RCVR_TEL: "", //Điện thoại
    PAY_MTHD:
      lstDcmnSbCd?.length > 0 ? lstinpCustOdMtPayMthd2?.at(0)?.ITEMCODE : "", //Phương thức thanh toán
    PYMNPERD: lstDcmnSbCd?.length > 0 ? lstTimeType?.at(0)?.ITEMCODE : "", //Chu kì thanh toán
    PYMNNUMB: "", //Thời hạn thanh toán
    SRC_DATA: "3", //Window hoặc web
    EMPLCODE: "", //Mã nhân viên
    SUM_AMNT: 0, //Tổng tiền qui đổi
    RDTNAMNT: 0, //Tiền chiết khấu
    VAT_AMNT: 0, //Tiền thuế qui đổi
    DETAIL: [],
  });
  console.log(initialValue);
  // const handleQR = async function () {
  //   if (infoVietQR == null) {
  //     const id = toast.loading("Đang tạo VietQR", {
  //       position: "top-center",
  //     });
  //     const body = {
  //       orderCode: new Date(Date.now()).getTime(),
  //       amount: formik.values.SUM_AMNT,
  //       description: "Thanh toan HD",
  //       buyerAddress: "số nhà, đường, phường, tỉnh hoặc thành phố",
  //       items: [],
  //       cancelUrl: "http://localhost:5173/promotion",
  //       returnUrl: "http://localhost:5173/promotion",
  //       expiredAt: Math.floor(
  //         (new Date(Date.now()).getTime() + 15 * 60000) / 1000
  //       ),
  //       template: "compact",
  //     };
  //     const query = `amount=${body.amount}&cancelUrl=${body.cancelUrl}&description=${body.description}&orderCode=${body.orderCode}&returnUrl=${body.returnUrl}`;
  //     const hmac = Base64.stringify(
  //       HmacSHA256(
  //         query,
  //         "dff2b663051b6bc4d07668b7c4e7a4f7f7365540fb8db84055b26156739a56e6"
  //       )
  //     );
  //     const data = await axios
  //       .post(
  //         "https://api-merchant.payos.vn/v2/payment-requests",
  //         { ...body, signature: hmac },
  //         {
  //           headers: {
  //             "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
  //             "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
  //           },
  //         }
  //       )
  //       .then((resp) => {
  //         setInfoVietQR({ ...resp.data.data });
  //         return resp.data.data;
  //       })
  //       .catch((e) => console.log(e));
  //     const data2 = await axios
  //       .post(
  //         "https://api.vietqr.io/v2/generate",
  //         {
  //           accountNo: data?.accountNumber,
  //           accountName: data?.accountName,
  //           acqId: data?.bin,
  //           amount: data?.amount,
  //           addInfo: data?.description,
  //           format: "text",
  //           template: "qr_only",
  //         },
  //         {
  //           headers: {
  //             "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
  //             "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
  //           },
  //         }
  //       )
  //       .then((resp) => {
  //         // setInfoVietQR({ ...resp.data.data });
  //         setInfoVietQR({ ...data, ...resp.data.data });

  //         toast.update(id, {
  //           render: "Tạo VietQR hoàn tất!",
  //           type: "success",
  //           isLoading: false,
  //           autoClose: 1500,
  //         });
  //         const contentType = "image/png";
  //         const b64Data = resp.data.data.qrDataURL.replace(
  //           "data:image/png;base64,",
  //           ""
  //         );

  //         const blob = base64StringToBlob(b64Data, contentType);
  //         // console.log(URL.createObjectURL(blob));
  //       })
  //       .catch((e) => console.log(e));
  //   }

  //   setOpenVietQR(true);
  //   // dispatch(openBlock());
  // };

  // useEffect(() => {
  //   setInfoVietQR(null);
  // }, [formik.values.SUM_AMNT]);

  // useEffect(() => {
  // console.log(infoVietQR);
  // }, [infoVietQR]);

  // const handlePayment = async () => {
  //   // let i = crypto
  //   //   .createHmac("sha512", "KLGVGJQNZFBFRMFLTDAFTOHKUDKGZIQU")
  //   //   .update(new Buffer(signData, "utf-8").digest("hex"));
  //   const vnp_SecureHash = "KLGVGJQNZFBFRMFLTDAFTOHKUDKGZIQU";

  //   const ip = await fetch("https://api.ipify.org?format=json")
  //     .then((response) => response.json())
  //     .then((data) => data.ip)
  //     .catch((error) => console.log(error));

  //   const objecVNP = {
  //     vnp_Amount: "1806000",
  //     vnp_BankCode: "ncb",
  //     vnp_Command: "pay",
  //     vnp_CreateDate: moment(new Date()).format("yyyyMMDDHHmmss"),
  //     vnp_CurrCode: "VND",
  //     vnp_IpAddr: ip,
  //     vnp_Locale: "vn",
  //     vnp_OrderInfo: encodeURIComponent("Thanh toan hoa don").replaceAll(
  //       "%20",
  //       "+"
  //     ),
  //     vnp_OrderType: "other",
  //     vnp_ReturnUrl: encodeURIComponent("http://localhost:5173/pay-success"),
  //     vnp_TmnCode: "PH24SM6K",
  //     vnp_TxnRef: "1211",
  //     vnp_Version: "2.1.0",
  //   };

  //   let resultArray = [];
  //   Object.keys(objecVNP).forEach((item) => {
  //     resultArray.push(item + "=" + objecVNP[item]);
  //   });
  //   const query = resultArray.join("&");
  //   console.log(query);
  //   // console.log(query);
  //   const hmac = Base64.stringify(hmacSHA512(query, vnp_SecureHash));
  //   console.log(hmac);
  //   console.log(hmacSHA512(query, vnp_SecureHash));
  //   let url =
  //     "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?" +
  //     query +
  //     "&vnp_SecureHash=" +
  //     hmac;
  //   window.open(url, "_blank");
  //   // console.log("hello");
  //   navigate("/");
  // };

  // useEffect(() => {}, [chooseAll]);

  const updateFormik = () => {
    const varFormik = initialValue.DETAIL?.filter(
      (item) => item.checked == true
    );
    setInitialValue({
      ...initialValue,
      RDTNCRAM:
        varFormik?.length > 0
          ? varFormik.reduce(
              (value, currentValue) =>
                value +
                (currentValue.SALEPRCE *
                  currentValue.PRDCQTTY *
                  currentValue.DSCNRATE) /
                  100,

              0
            )
          : 0,
      SUM_CRAM:
        varFormik?.length > 0
          ? varFormik.reduce(
              (value, currentValue) =>
                value + currentValue.SALEPRCE * currentValue.PRDCQTTY,
              0
            )
          : 0,
      SUM_AMNT:
        varFormik?.length > 0
          ? varFormik.reduce(
              (value, currentValue) =>
                value +
                currentValue.SALEPRCE * currentValue.PRDCQTTY -
                (currentValue.SALEPRCE *
                  currentValue.PRDCQTTY *
                  currentValue.DSCNRATE) /
                  100,
              0
            )
          : 0,
    });
  };

  const checkAll = (checked) => {
    initialValue.DETAIL = initialValue.DETAIL.map((item) => {
      return { ...item, checked: checked };
    });
    updateFormik();
  };

  const checkItem = (id) => {
    console.log(id);
    let cloneInitialValue = initialValue;
    cloneInitialValue.DETAIL.find((item) => item.PRDCCODE == id).checked =
      !cloneInitialValue.DETAIL.find((item) => item.PRDCCODE == id).checked;
    setInitialValue({ ...cloneInitialValue });
    updateFormik();
  };

  // useEffect(() => {
  //   function loadDetailCart() {
  //     const detail = productCarts?.map((item) => {
  //       return {
  //         PRDCCODE: item.PRDCCODE, //Mã sản phẩm
  //         PRDCNAME: item.PRDCNAME,
  //         ORGNCODE: "1", //Nguồn sản phẩm
  //         SORTCODE: "1", //Phân loại sản phẩm
  //         QUOMCODE: item.QUOMCODE, //Đơn vị tính
  //         QUOMQTTY: 1, //Số lượng
  //         CRSLPRCE: item.PRCEDSCN, //Đơn giá theo tiền tệ
  //         MNEYCRAM: item.PRCEDSCN, //Thành tiền
  //         PRDCIMGE: item.PRDCIMAGE,
  //         DISCRATE: 0, //%Chiết khấu
  //         DCPRCRAM: 0, //Tiền giảm CK
  //         PRDCQTTY: item.QUOMQTTY, //Số lượng qui đổi
  //         SALEPRCE: item.SALEPRCE, //Đơn giá qui đổi
  //         MNEYAMNT: item.SALEPRCE * item.QUOMQTTY, //Thành tiền qui đổi
  //         DCPRAMNT: 0, //Tiền giảm CK qui đổi
  //         DSCNRATE: item.DSCNRATE,
  //         KKKK0000: item["KKKK0000"],
  //         COMPCODE: item["COMPCODE"],
  //         LCTNCODE: item["LCTNCODE"],
  //         checked: false,
  //         ...item,
  //       };
  //     });
  //     console.log(detail);
  //     formik.values.DETAIL = detail ? [...detail] : [];
  //     updateFormik();
  //   }

  //   loadDetailCart();
  // }, [actionCart]);

  useEffect(() => {
    setInitialValue({
      ...initialValue,
      DETAIL: productCarts?.map((item) => {
        return {
          PRDCCODE: item.PRDCCODE, //Mã sản phẩm
          PRDCNAME: item.PRDCNAME,
          ORGNCODE: "1", //Nguồn sản phẩm
          SORTCODE: "1", //Phân loại sản phẩm
          QUOMCODE: item.QUOMCODE, //Đơn vị tính
          QUOMQTTY: 1, //Số lượng
          CRSLPRCE: item.PRCEDSCN, //Đơn giá theo tiền tệ
          MNEYCRAM: item.PRCEDSCN, //Thành tiền
          PRDCIMGE: item.PRDCIMAGE,
          DISCRATE: 0, //%Chiết khấu
          DCPRCRAM: 0, //Tiền giảm CK
          PRDCQTTY: item.QUOMQTTY, //Số lượng qui đổi
          SALEPRCE: item.SALEPRCE, //Đơn giá qui đổi
          MNEYAMNT: item.SALEPRCE * item.QUOMQTTY, //Thành tiền qui đổi
          DCPRAMNT: 0, //Tiền giảm CK qui đổi
          DSCNRATE: item.DSCNRATE,
          KKKK0000: item["KKKK0000"],
          COMPCODE: item["COMPCODE"],
          LCTNCODE: item["LCTNCODE"],
          checked: false,
          ...item,
        };
      }),
    });
  }, [productCarts]);
  console.log(initialValue);
  return (
    <div className="product-detail">
      <InfoPage data={["Giỏ hàng", "Thanh toán và đặt hàng"]} />

      {/* Table thanh toán */}
      <div className="xl:container xl:mx-auto mx-5 mb-5">
        <Wrapper>
          <div className="overflow-y-scroll  h-[500px]">
            <TableDetailProduct
              onHandleCheckAll={checkAll}
              onHandleChooseItem={checkItem}
              data={initialValue.DETAIL}
            ></TableDetailProduct>
          </div>
        </Wrapper>
      </div>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => {
          return (
            <Form className="xl:container xl:mx-auto mx-5 mb-5">
              <Wrapper>
                <div className="px-3 py-5">
                  <h5 className="font-semibold text-gray-dark mb-3">
                    Thông tin đơn hàng
                  </h5>
                  <div className="grid xl:grid-cols-3 grid-cols-2 gap-5 mb-5 px-5">
                    <div className="flex flex-col gap-y-3">
                      {/* TÊn người dùng  */}
                      <InputFormikForm
                        name="MCUSTNME"
                        label={"Tên người dùng"}
                        important={true}
                        disabled={true}
                      />
                      <InputFormikForm
                        name="CUSTADDR"
                        label={"Địa chỉ"}
                        important={true}
                        disabled={true}
                      />
                      <InputFormikForm
                        name={"CUST_TEL"}
                        label={"Số điện thoại"}
                        important={true}
                        disabled={true}
                      ></InputFormikForm>
                      <DatePickerFormikForm
                        name="ODERDATE"
                        label={"Ngày đặt hàng"}
                        important={true}
                        // disabled={true}
                      ></DatePickerFormikForm>

                      <SelectFormikForm
                        options={lstDcmnSbCd ? lstDcmnSbCd : []}
                        itemKey={"ITEMCODE"}
                        itemValue={"ITEMNAME"}
                        important={true}
                        name="DCMNSBCD"
                        label={"Phân lọai"}
                      ></SelectFormikForm>

                      <NumberFormikForm
                        name={"RDTNRATE"}
                        label={"%Chiết khấu"}
                        placeholder="Nhập phần trăm chiết khấu!"
                        important={true}
                        // disabled={true}
                        unit="%"
                      ></NumberFormikForm>

                      <NumberFormikForm
                        name={"CSCMRATE"}
                        label={"Huê hồng khách hàng"}
                        placeholder="Nhập huê hồng..."
                        important={true}
                        disabled={true}
                        unit="VNĐ"
                      ></NumberFormikForm>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      <InputFormikForm
                        name={"TAX_CODE"}
                        label={"Mã số thuế"}
                        important={true}
                        placeholder="Nhập mã số huế..."
                        // disabled={true}
                      ></InputFormikForm>
                      <NumberFormikForm
                        name={"VAT_RATE"}
                        label={"Thuế suất"}
                        important={true}
                        placeholder="Nhập thuế suất..."
                        // disabled={true}
                      ></NumberFormikForm>
                      <SelectFormikForm
                        options={lstDlvrMthd ? lstDlvrMthd : []}
                        itemKey={"ITEMCODE"}
                        itemValue={"ITEMNAME"}
                        important={true}
                        name="DLVRMTHD"
                        label={"Phương thức giao hàng"}
                      ></SelectFormikForm>
                      <SelectFormikForm
                        options={lstDlvrType ? lstDlvrType : []}
                        itemKey={"ITEMCODE"}
                        itemValue={"ITEMNAME"}
                        important={true}
                        name="DLVRTYPE"
                        label={"Phương thức vận chuyển"}
                      ></SelectFormikForm>
                      <DatePickerFormikForm
                        name="DLVRPLCE"
                        label={"Ngày giao hàng"}
                        important={true}
                        // disabled={true}
                      ></DatePickerFormikForm>
                      <SelectFormikForm
                        options={lstListHour ? lstListHour : []}
                        itemKey={"ITEMCODE"}
                        itemValue={"ITEMNAME"}
                        important={true}
                        name="DLVRHOUR"
                        label={"Thời gian giao hàng"}
                      ></SelectFormikForm>
                      <InputFormikForm
                        name={"DLVRPLCE"}
                        label={"Nơi giao hàng"}
                        important={true}
                        placeholder="Nhập nơi giao hàng..."
                        // disabled={true}
                      ></InputFormikForm>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      <InputFormikForm
                        name={"DLVRADDR"}
                        label={"Địa chỉ giao hàng"}
                        important={true}
                        placeholder="Nhập địa chỉ giao hàng..."
                        // disabled={true}
                      ></InputFormikForm>
                      <InputFormikForm
                        name={"RCVREMPL"}
                        label={"Người nhận hàng"}
                        important={true}
                        placeholder="Nhập họ tên người nhận hàng..."
                        // disabled={true}
                      ></InputFormikForm>
                      <InputFormikForm
                        name={"RCVR_TEL"}
                        label={"Số điện thoại người nhận"}
                        important={true}
                        placeholder="Nhập số điện thoại người nhận hàng..."
                        // disabled={true}
                      ></InputFormikForm>
                      <SelectFormikForm
                        options={
                          lstinpCustOdMtPayMthd2 ? lstinpCustOdMtPayMthd2 : []
                        }
                        itemKey={"ITEMCODE"}
                        itemValue={"ITEMNAME"}
                        important={true}
                        name="PAY_MTHD"
                        label={"Phương thức thanh toán"}
                      ></SelectFormikForm>
                      <SelectFormikForm
                        options={lstTimeType ? lstTimeType : []}
                        itemKey={"ITEMCODE"}
                        itemValue={"ITEMNAME"}
                        important={true}
                        name="PYMNPERD"
                        label={"Chu kì thanh toán"}
                      ></SelectFormikForm>
                      <InputFormikForm
                        name={"PYMNNUMB"}
                        label={"Thời hạn thanh toáns"}
                        important={true}
                        placeholder="Nhập thời hạn thanh toán..."
                        // disabled={true}
                      ></InputFormikForm>
                      <TextareaFormikForm
                        row={5}
                        name="NOTETEXT"
                        placeholder="Nhập diễn giải..."
                        label={"Diễn giải"}
                      ></TextareaFormikForm>
                    </div>
                  </div>
                </div>
              </Wrapper>
              <Wrapper>
                <ButtonForm type="submit" label={"Đặt hàng"}></ButtonForm>
              </Wrapper>
            </Form>
          );
        }}
      </Formik>
    </div>

    //     </Wrapper>
    //   </div>
    // </div>
  );
};

export default PayDetailComponent;
