import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoPage from "../../components/InfoPage";
import { toast } from "react-toastify";
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
import VNPay from "../../assets/img/vnpay.png";
import VietQR from "../../assets/img/vietqr.png";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-hex";
import { HmacSHA256 } from "crypto-js";
import * as Yup from "yup";
import InputFormikForm from "../../components/formikCustomForm/InputFormikForm";
import { Form, Formik } from "formik";
import TextareaFormikForm from "../../components/formikCustomForm/TextareaFormikForm";
import Wrapper from "../../components/Wrapper";
import ButtonForm from "../../components/commonForm/ButtonForm";
import ImageFetch from "../../components/ImageFetch";
import moment from "moment";
import { usePostNewOrderMutation } from "../../redux/query/orderQuery";
import { unCheckAllProduct } from "../../redux/reducer/cartReducer";
import axios from "axios";
import { base64StringToBlob } from "blob-util";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successPayment, setSuccessPayment] = useState(false);
  const [element, setElement] = useState(null);
  const [typePayment, setTypePayment] = useState("");
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [infoVietQR, setInfoVietQR] = useState(null);
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
    postNewOrder,
    {
      data: dataNewOrder,
      isLoading: isLoadingNewOrder,
      isError: isErrorNewOrder,
      isSuccess: isSuccessNewOrder,
    },
  ] = usePostNewOrderMutation();
  const [initialValue, setInitialValue] = useState({
    COMPCODE: "PMC", //Công ty
    LCTNCODE: "001", //Chi nhánh
    DCMNSBCD: lstDcmnSbCd?.length > 0 ? lstDcmnSbCd?.at(0)?.ITEMCODE : "", // phân loại
    ODERCODE: "", //Mã đơn hàng
    ODERDATE: new Date(), //Ngày đơn hàng
    CUSTCODE: currentUser?.CUSTCODE, //Mã khách hàng
    MCUSTNME: currentUser?.CUSTNAME, //Tên khách hàng
    CUSTADDR: currentUser?.CUSTADDR, //Địa chỉ khách hàng
    CUST_TEL: currentUser?.USER_TEL, //Số điệnt thoại khách hàng
    NOTETEXT: "", //Diễn giải
    SUM_CRAM: productCarts
      ?.filter((item) => item.checked == true)
      .reduce((total, item) => (total += item.SALEPRCE * item.QUOMQTTY), 0), //Tổng tiền
    SMPRQTTY: productCarts
      ?.filter((item) => item.checked == true)
      .reduce((total, item) => (total += item.QUOMQTTY), 0), //Tổng số lượng
    RDTNRATE: 0, //%Chiết khấu
    RDTNCRAM: productCarts
      ?.filter((item) => item.checked == true)
      .reduce(
        (total, item) =>
          (total += ((item.SALEPRCE * item.DSCNRATE) / 100) * item.QUOMQTTY),
        0
      ), //Tiền chiết khấu
    CSCMRATE: 0, //Huê hồng khách hàng
    TAX_CODE: "", //Mã số thuế
    VAT_RATE: 0, //THuế suất
    VAT_CRAM: 0, //Tiền thuế
    DLVRMTHD: lstDlvrMthd?.length > 0 ? lstDlvrMthd?.at(0)?.ITEMCODE : "", //Phương thức giao hàng
    DLVRTYPE: lstDlvrType?.length > 0 ? lstDlvrType?.at(0)?.ITEMCODE : "", //PHương thức vận chuyển
    DLVRDATE: new Date(), //Ngày giao hàng
    DLVRHOUR: lstListHour?.length > 0 ? lstListHour?.at(0)?.ITEMCODE : "", //Giờ giao hàng
    DLVRPLCE: currentUser?.CUSTADDR, //Nơi giao hàng
    DLVRADDR: currentUser?.CUSTADDR, //Địa chỉ giao
    RCVREMPL: currentUser?.USERNAME, //Người nhận hàng
    RCVR_TEL: currentUser?.USER_TEL, //Điện thoại người nhận hàng
    PAY_MTHD:
      lstDcmnSbCd?.length > 0 ? lstinpCustOdMtPayMthd2?.at(0)?.ITEMCODE : "", //Phương thức thanh toán
    PYMNPERD: lstDcmnSbCd?.length > 0 ? lstTimeType?.at(0)?.ITEMCODE : "", //Chu kì thanh toán
    PYMNNUMB: 1, //Thời hạn thanh toán
    SRC_DATA: "3", //Window hoặc web
    EMPLCODE: "", //Mã nhân viên
    SUM_AMNT: productCarts
      ?.filter((item) => item.checked == true)
      .reduce(
        (total, item) =>
          (total +=
            (item.SALEPRCE - (item.SALEPRCE * item.DSCNRATE) / 100) *
            item.QUOMQTTY),
        0
      ), //Tổng tiền qui đổi
    RDTNAMNT: productCarts
      ?.filter((item) => item.checked == true)
      .reduce(
        (total, item) =>
          (total += ((item.SALEPRCE * item.DSCNRATE) / 100) * item.QUOMQTTY),
        0
      ), //Tiền chiết khấu qui đổi
    VAT_AMNT: 0, //Tiền thuế qui đổi
    DETAIL: [...productCarts.filter((item) => item.checked == true)],
  });

  const handlePayment = async (values) => {
    // let i = crypto
    //   .createHmac("sha512", "KLGVGJQNZFBFRMFLTDAFTOHKUDKGZIQU")
    //   .update(new Buffer(signData, "utf-8").digest("hex"));
    const vnp_SecureHash = "KLGVGJQNZFBFRMFLTDAFTOHKUDKGZIQU";

    const ip = await fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => data.ip)
      .catch((error) => console.log(error));

    const objecVNP = {
      vnp_Amount: "1806000",
      vnp_BankCode: "ncb",
      vnp_Command: "pay",
      vnp_CreateDate: moment(new Date()).format("yyyyMMDDHHmmss"),
      vnp_CurrCode: "VND",
      vnp_IpAddr: ip,
      vnp_Locale: "vn",
      vnp_OrderInfo: encodeURIComponent("Thanh toan hoa don").replaceAll(
        "%20",
        "+"
      ),
      vnp_OrderType: "other",
      vnp_ReturnUrl: encodeURIComponent("http://localhost:5173/pay-success"),
      vnp_TmnCode: "PH24SM6K",
      vnp_TxnRef: "1211",
      vnp_Version: "2.1.0",
    };

    let resultArray = [];
    Object.keys(objecVNP).forEach((item) => {
      resultArray.push(item + "=" + objecVNP[item]);
    });
    const query = resultArray.join("&");
    console.log(query);
    // console.log(query);
    const hmac = Base64.stringify(hmacSHA512(query, vnp_SecureHash));
    console.log(hmac);
    console.log(hmacSHA512(query, vnp_SecureHash));
    let url =
      "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?" +
      query +
      "&vnp_SecureHash=" +
      hmac;
    window.open(url, "_blank");
    // console.log("hello");
    dispatch(unCheckAllProduct());
    setSuccessPayment(true);
  };
  const handleQR = async function (values) {
    if (infoVietQR == null) {
      const id = toast.loading("Đang tạo VietQR", {
        position: "top-center",
      });
      const body = {
        orderCode: new Date(Date.now()).getTime(),
        amount: values.SUM_AMNT,
        description: "Thanh toan HD",
        buyerAddress: "số nhà, đường, phường, tỉnh hoặc thành phố",
        items: [],
        cancelUrl: "http://localhost:5173/promotion",
        returnUrl: "http://localhost:5173/promotion",
        expiredAt: Math.floor(
          (new Date(Date.now()).getTime() + 15 * 60000) / 1000
        ),
        template: "compact",
      };
      const query = `amount=${body.amount}&cancelUrl=${body.cancelUrl}&description=${body.description}&orderCode=${body.orderCode}&returnUrl=${body.returnUrl}`;
      const hmac = Base64.stringify(
        HmacSHA256(
          query,
          "dff2b663051b6bc4d07668b7c4e7a4f7f7365540fb8db84055b26156739a56e6"
        )
      );
      const data = await axios
        .post(
          "https://api-merchant.payos.vn/v2/payment-requests",
          { ...body, signature: hmac },
          {
            headers: {
              "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
              "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
            },
          }
        )
        .then((resp) => {
          setInfoVietQR({ ...resp.data.data });
          return resp.data.data;
        })
        .catch((e) => console.log(e));
    }
  };

  const validateSchema = Yup.object().shape({
    DLVRADDR: Yup.string().required("Không để trống địa chỉ giao hàng!"),
    DLVRPLCE: Yup.string().required("Không để trống nơi giao giao hàng!"),
    RCVREMPL: Yup.string().required("Không để trống người nhận hàng!"),
    RCVR_TEL: Yup.string().required("Không để trống số điện thoại người nhận!"),
  });

  const handlePostOrder = async (values) => {
    const body = {
      ...values,
      DLVRDATE: moment(values.DLVRDATE).format("yyyy-MM-DD"),
      ODERDATE: moment(values.ODERDATE).format("yyyy-MM-DD"),
      DETAIL: values.DETAIL?.map((item) => {
        return {
          PRDCCODE: item.PRDCCODE, //Mã sản phẩm
          PRDCNAME: item.PRDCNAME,
          ORGNCODE: "1", //Nguồn sản phẩm
          SORTCODE: "1", //Phân loại sản phẩm
          QUOMCODE: item.QUOMCODE, //Đơn vị tính
          QUOMQTTY: 1, //Số lượng
          CRSLPRCE: item.SALEPRCE, //Đơn giá theo tiền tệ
          MNEYCRAM:
            (item.SALEPRCE - (item.SALEPRCE * item.DSCNRATE) / 100) *
            item.QUOMQTTY, //Thành tiền
          PRDCIMGE: item.PRDCIMAGE,
          DISCRATE: item.DSCNRATE, //%Chiết khấu
          DCPRCRAM: (item.SALEPRCE * item.DSCNRATE) / 100, //Tiền giảm CK
          PRDCQTTY: item.QUOMQTTY, //Số lượng qui đổi
          SALEPRCE: item.SALEPRCE, //Đơn giá qui đổi
          MNEYAMNT:
            (item.SALEPRCE - (item.SALEPRCE * item.DSCNRATE) / 100) *
            item.QUOMQTTY, //Thành tiền qui đổi
          DCPRAMNT: 0, //Tiền giảm CK qui đổi
          DSCNRATE: item.DSCNRATE,
          KKKK0000: item["KKKK0000"],
          COMPCODE: item["COMPCODE"],
          LCTNCODE: item["LCTNCODE"],
          ...item,
        };
      }),
    };
    try {
      await postNewOrder(body).unwrap();
    } catch (error) {
      console.log(error);
    }
    console.log(body);
  };
  console.log(dataNewOrder);
  useEffect(() => {
    const findItem = productCarts.find((item) => item.checked == true);
    if (!findItem) {
      navigate("/cart");
      toast.warning("Vui lòng chọn sản phẩm rồi mới thanh toán!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  }, []);

  useEffect(() => {
    if (isSuccessNewOrder) {
      setSuccessPayment(true);
      dispatch(unCheckAllProduct());
    }
  }, [isSuccessNewOrder, infoVietQR]);
  console.log(infoVietQR);
  useEffect(() => {
    if (typePayment == "money") {
      setElement(
        <div className="flex items-center flex-col pt-20">
          <h5 className="mb-5 text-2xl">Đặt hàng thành công</h5>
          <div className="flex gap-x-2">
            <ButtonForm
              className="!w-fit !bg-slate-500"
              label={"Quay về trang chủ"}
              type="button"
              onClick={() => navigate("/")}
            ></ButtonForm>
            <ButtonForm
              type="button"
              className="!w-fit"
              label={"Tiếp tục mua sắm"}
              onClick={() => navigate("/products")}
            ></ButtonForm>
          </div>
        </div>
      );
    } else if (typePayment == "vnpay") {
      setElement(
        <div className="flex items-center flex-col pt-20">
          <h5 className="mb-5 text-2xl">Bạn đang thanh toán qua VNPAY!</h5>
          <div className="flex gap-x-2">
            <ButtonForm
              className="!w-fit !bg-slate-500"
              label={"Quay về trang chủ"}
              type="button"
              onClick={() => navigate("/")}
            ></ButtonForm>
            <ButtonForm
              type="button"
              className="!w-fit"
              label={"Tôi đã chuyển khoản"}
              // onClick={() => navigate("/products")}
            ></ButtonForm>
          </div>
        </div>
      );
    } else if (typePayment == "vietqr") {
      setElement(
        <div>
          <h5>Vui lòng thanh toán theo thông tin bên dưới!</h5>
          <div className="w-full" id="info_vietqr"></div>
        </div>
      );
    }
  }, [typePayment, infoVietQR]);
  return (
    <div className="product-detail">
      <InfoPage data={(["Giỏ hàng"], ["Thanh toán"])} />
      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          // setSuccessPayment(!successPayment);
          if (typePayment == "vnpay") {
            handlePayment(values);
          } else if (typePayment == "vietqr") {
            handleQR(values);
          } else if (typePayment == "money") {
            handlePostOrder(values);
          } else {
            toast.warning("Vui lòng chọn loại thanh toán!", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: true,
            });
          }
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <div className="xl:container xl:mx-auto mx-5 mb-5">
                <div className="grid grid-cols-[1fr_2fr] gap-x-3">
                  <Wrapper>
                    <div className="px-3 py-5">
                      <h5 className="font-semibold text-xl text-gray-dark mb-3">
                        Thông tin đơn hàng
                      </h5>
                      <div className="flex flex-col gap-y-4 border-b pb-5 mb-5">
                        {values.DETAIL.map((item) => {
                          return (
                            <div className="flex justify-between">
                              <div className="flex items-center gap-x-2">
                                <ImageFetch
                                  url={item.PRDCIMAGE}
                                  id={item.PRDCCODE}
                                  className={"!size-20"}
                                />
                                <span className="text-sm">{item.PRDCNAME}</span>
                                <span className="text-gray-800 font-semibold">
                                  {" "}
                                  x{item.QUOMQTTY}
                                </span>
                              </div>

                              <div className="flex flex-col">
                                <span className="text-gray-800 font-semibold">
                                  {" "}
                                  {(
                                    item.SALEPRCE -
                                    ((item.DSCNRATE * item.SALEPRCE) / 100) *
                                      item.QUOMQTTY
                                  )?.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                                <span className="text-gray text-sm">
                                  ( -
                                  {(
                                    (item.DSCNRATE * item.SALEPRCE) /
                                    100
                                  )?.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                  )
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-center justify-between">
                          <span className="italic">Tổng số lượng:</span>
                          <span className="text-gray-700 font-semibold text-base">
                            {values.SMPRQTTY} sản phẩm
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="italic">Tạm tính:</span>
                          <span className="text-gray-700 font-semibold text-base">
                            {values.SUM_CRAM.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="italic">Tổng giảm:</span>
                          <span className="text-gray-700 font-semibold text-base">
                            -
                            {values.RDTNCRAM.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="italic">Tổng tiền:</span>
                          <span className="text-second font-bold text-2xl">
                            {values.SUM_AMNT.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Wrapper>
                  {/* <Wrapper>
                    <div className="px-3 py-5">
                      <h5 className="font-semibold text-gray-dark mb-3">
                        Thông tin đơn hàng
                      </h5>
                      <div className="grid xl:grid-cols-3 grid-cols-2 gap-5 mb-5 px-5">
                        <div className="flex flex-col gap-y-3">
            
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
     
                          ></DatePickerFormikForm>

                          <SelectFormikForm
                            options={lstDcmnSbCd ? lstDcmnSbCd : []}
                            loading={isLoadingDcmnSbCd}
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
                  
                          ></InputFormikForm>
                          <NumberFormikForm
                            name={"VAT_RATE"}
                            label={"Thuế suất"}
                            important={true}
                            placeholder="Nhập thuế suất..."
                         
                          ></NumberFormikForm>
                          <SelectFormikForm
                            options={lstDlvrMthd ? lstDlvrMthd : []}
                            loading={isLoadingDlvrMthd}
                            itemKey={"ITEMCODE"}
                            itemValue={"ITEMNAME"}
                            important={true}
                            name="DLVRMTHD"
                            label={"Phương thức giao hàng"}
                          ></SelectFormikForm>
                          <SelectFormikForm
                            options={lstDlvrType ? lstDlvrType : []}
                            loading={isLoadingDlvrType}
                            itemKey={"ITEMCODE"}
                            itemValue={"ITEMNAME"}
                            important={true}
                            name="DLVRTYPE"
                            label={"Phương thức vận chuyển"}
                          ></SelectFormikForm>
                          <DatePickerFormikForm
                            name="DLVRDATE"
                            label={"Ngày giao hàng"}
                            important={true}
          
                          ></DatePickerFormikForm>
                          <SelectFormikForm
                            options={lstListHour ? lstListHour : []}
                            loading={isLoadingListHour}
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
                       
                          ></InputFormikForm>
                        </div>
                        <div className="flex flex-col gap-y-3">
                          <InputFormikForm
                            name={"DLVRADDR"}
                            label={"Địa chỉ giao hàng"}
                            important={true}
                            placeholder="Nhập địa chỉ giao hàng..."
                         
                          ></InputFormikForm>
                          <InputFormikForm
                            name={"RCVREMPL"}
                            label={"Người nhận hàng"}
                            important={true}
                            placeholder="Nhập họ tên người nhận hàng..."
                        
                          ></InputFormikForm>
                          <InputFormikForm
                            name={"RCVR_TEL"}
                            label={"Số điện thoại người nhận"}
                            important={true}
                            placeholder="Nhập số điện thoại người nhận hàng..."
                      
                          ></InputFormikForm>
                          <SelectFormikForm
                            options={
                              lstinpCustOdMtPayMthd2
                                ? lstinpCustOdMtPayMthd2
                                : []
                            }
                            loading={isLoadingInpCustOdMtPayMthd}
                            itemKey={"ITEMCODE"}
                            itemValue={"ITEMNAME"}
                            important={true}
                            name="PAY_MTHD"
                            label={"Phương thức thanh toán"}
                          ></SelectFormikForm>
                          <SelectFormikForm
                            options={lstTimeType ? lstTimeType : []}
                            itemKey={"ITEMCODE"}
                            loading={isLoadingTimeType}
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
                  </Wrapper> */}
                  <Wrapper>
                    <div className="px-3 py-5">
                      <h5 className="font-semibold text-xl text-gray-dark mb-3">
                        Thông tin thanh toán
                      </h5>
                      <div className="w-full overflow-hidden">
                        <div
                          className={`w-[200%] grid grid-cols-2  ${
                            successPayment
                              ? "-translate-x-1/2"
                              : "translate-x-0"
                          } transition-transform duration-200 ease-in`}
                        >
                          <div>
                            <div className="grid grid-cols-2 gap-3 mb-5">
                              <div className="flex flex-col gap-y-3">
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
                                <InputFormikForm
                                  name={"DLVRPLCE"}
                                  label={"Nơi giao hàng"}
                                  important={true}
                                  placeholder="Nhập nơi giao hàng..."
                                ></InputFormikForm>
                                <InputFormikForm
                                  name={"DLVRADDR"}
                                  label={"Địa chỉ giao hàng"}
                                  important={true}
                                  placeholder="Nhập địa chỉ giao hàng..."
                                ></InputFormikForm>
                              </div>
                              <div className="flex flex-col gap-y-3">
                                <InputFormikForm
                                  name={"RCVREMPL"}
                                  label={"Người nhận hàng"}
                                  important={true}
                                  placeholder="Nhập họ tên người nhận hàng..."
                                ></InputFormikForm>
                                <InputFormikForm
                                  name={"RCVR_TEL"}
                                  label={"Số điện thoại người nhận"}
                                  important={true}
                                  placeholder="Nhập số điện thoại người nhận hàng..."
                                ></InputFormikForm>
                                <TextareaFormikForm
                                  row={5}
                                  name="NOTETEXT"
                                  placeholder="Nhập diễn giải..."
                                  label={"Diễn giải"}
                                ></TextareaFormikForm>
                              </div>
                            </div>
                            <h5 className="font-semibold text-xl text-gray-dark mb-3 mt-10">
                              Chọn hình thức thanh toán
                            </h5>

                            <div className="grid grid-cols-3 gap-3 w-full mb-5">
                              <div
                                onClick={() => setTypePayment("vnpay")}
                                className={`${
                                  typePayment == "vnpay"
                                    ? "border-second"
                                    : "border-gray-300"
                                } border w-full rounded-md px-5 py-2 flex items-center justify-center cursor-pointer`}
                              >
                                <img
                                  src={VNPay}
                                  alt=""
                                  className="w-36 h-12 object-contain"
                                />
                              </div>
                              <div
                                onClick={() => setTypePayment("vietqr")}
                                className={`${
                                  typePayment == "vietqr"
                                    ? "border-second"
                                    : "border-gray-300"
                                } border w-full rounded-md px-5 py-2 flex items-center justify-center cursor-pointer`}
                              >
                                <img
                                  src={VietQR}
                                  alt=""
                                  className="w-36 h-7 object-contain"
                                />
                              </div>
                              <div
                                onClick={() => setTypePayment("money")}
                                className={`${
                                  typePayment == "money"
                                    ? "border-second"
                                    : "border-gray-300"
                                } border w-full rounded-md px-5 py-2 flex items-center justify-center cursor-pointer`}
                              >
                                <div
                                  alt=""
                                  className="h-12 flex items-center justify-center"
                                >
                                  <span className="text-base flex gap-x-1 font-medium text-gray-600">
                                    <i class="ri-wallet-2-line"></i> Thanh toán
                                    khi nhận hàng
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-x-3">
                              <ButtonForm
                                type="button"
                                onClick={() => navigate("/cart")}
                                disabled={isLoadingNewOrder}
                                label={"Quay lại"}
                                className="!w-28 !bg-slate-500"
                              ></ButtonForm>
                              <ButtonForm
                                type="submit"
                                loading={isLoadingNewOrder}
                                label={"Đặt hàng"}
                                className="!w-28"
                              ></ButtonForm>
                            </div>
                          </div>
                          <div>{element}</div>
                        </div>
                      </div>
                    </div>
                  </Wrapper>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PaymentPage;
