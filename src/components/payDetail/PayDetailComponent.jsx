import React, { useEffect, useRef, useState } from "react";
import Wrapper from "@components/Wrapper";
import Asus from "@assets/img/asus.jpg";
import ProductSlider from "@components/ProductSlider";
import InfoPage from "@components/InfoPage";
import { useDispatch, useSelector } from "react-redux";
import {
  decreamentAmountProduct,
  increamentAmountProduct,
} from "@redux/actions/cartAction";
import { chooseProduct } from "@redux/reducer/cartReducer";
import { chooseAllProduct } from "@redux/reducer/cartReducer";
import {
  changeAmoutProduct,
  deleteProductFromCart,
  loadCart,
} from "../../redux/actions/cartAction";
import Combobox from "../Combobox";
import Input from "../Input";
import DatePicker from "../DatePicker";
import moment from "moment";
import TextArea from "../TextArea";
import {
  Form,
  Formik,
  FormikProvider,
  useFormik,
  useFormikContext,
} from "formik";
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
import VNPay from "@assets/img/vnpay.png";
import VietQR from "@assets/img/vietqr.png";
import { closeBlock, openBlock } from "../../redux/reducer/popupReducer";
import { toast } from "react-toastify";
import { info } from "autoprefixer";
import { base64StringToBlob } from "blob-util";
import { postData } from "../../api/api";
import TableDetailProduct from "./TableDetailProduct";
const PayDetailComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);
  const [stateButton, setStateButton] = useState("");
  const [chooseAll, setChooseAll] = useState(false);
  const { productCarts } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const { showAlert } = useSelector((state) => state.popup);
  const [openVietQR, setOpenVietQR] = useState(false);
  const [infoVietQR, setInfoVietQR] = useState(null);
  const [stateAction, setStateAction] = useState(false);
  let timer = useRef(null);
  const {
    isLoadingCommon,
    products,
    lstWareHouse,
    lstDcmnSbCd,
    lstDlvrMthd,
    lstDlvrType,
    lstListHour,
    lstinpCustOdMtPayMthd2,
    lstTimeType,
  } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(true);
  // console.log(productCarts);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      COMPCODE: "PMC", //Công ty
      LCTNCODE: "001", //Chi nhánh
      DCMNSBCD: lstDcmnSbCd?.at(0)?.ITEMCODE, // phân loại
      ODERCODE: "", //Mã đơn hàng
      ODERDATE: moment(new Date()).format("yyyy-MM-DD"), //Ngày đơn hàng
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
      DLVRMTHD: lstDlvrMthd?.at(0)?.ITEMCODE, //Phương thức giao hàng
      DLVRTYPE: lstDlvrType?.at(0)?.ITEMCODE, //PHương thức vận chuyển
      DLVRDATE: moment(new Date()).format("yyyy-MM-DD"), //Ngày giao hàng
      DLVRHOUR: lstListHour?.at(0)?.ITEMCODE, //Giờ giao hàng
      DLVRPLCE: "", //Nơi giao hàng
      DLVRADDR: "", //Địa chỉ giao
      RCVREMPL: "", //Người nhận hàng
      RCVR_TEL: "", //Điện thoại
      PAY_MTHD: lstinpCustOdMtPayMthd2?.at(0)?.ITEMCODE, //Phương thức thanh toán
      PYMNPERD: lstTimeType?.at(0)?.ITEMCODE, //Chu kì thanh toán
      PYMNNUMB: "", //Thời hạn thanh toán
      SRC_DATA: "3", //Window hoặc web
      EMPLCODE: "", //Mã nhân viên
      SUM_AMNT: 0, //Tổng tiền qui đổi
      RDTNAMNT: 0, //Tiền chiết khấu
      VAT_AMNT: 0, //Tiền thuế qui đổi
      DETAIL: [], //Chi tiết
    },
    validationSchema: Yup.object().shape({
      // MCUSTNME: Yup.string().required("Không được để trống"),
      // CUSTADDR: Yup.string().required("Địa chỉ không được để trống"),
      // CUST_TEL: Yup.string().required("Số điện thoại không được để trống"),
      // ODERDATE: Yup.string().required("Ngày đặt hàng không để trống"),
      // DCMNSBCD: Yup.string().required("Không để trống phân loại"),
      // DLVRMTHD: Yup.string().required("Không để trống phân loại"),
    }),
    onSubmit: (value) => {
      console.log(value.SMPRQTTY);
      if (value.SMPRQTTY == undefined) {
        toast.warning("Bạn chưa chọn sản phẩm thanh toán!", {
          autoClose: 1500,
          hideProgressBar: true,
          position: "top-center",
        });
        return;
      }

      switch (stateButton) {
        case "vnpay":
          // console.log("payment");
          handlePayment();
          break;
        case "order":
          // console.log("order");
          // const body = { ...value };
          // console.log(body);
          // dispatch(postOrder({ DCMNCODE: "DDHKH", HEADER: [body] }));
          break;
        case "vietqr":
          handleQR();
          break;
        default:
          toast.warning("Bạn chưa chọn ngân hàng để thanh toán!", {
            autoClose: 1500,
            hideProgressBar: true,
            position: "top-center",
          });
          break;
      }
    },
  });

  const handleQR = async function () {
    if (infoVietQR == null) {
      const id = toast.loading("Đang tạo VietQR");
      const body = {
        orderCode: new Date(Date.now()).getTime(),
        amount: formik.values.SUM_AMNT,
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
      const data2 = await axios
        .post(
          "https://api.vietqr.io/v2/generate",
          {
            accountNo: data?.accountNumber,
            accountName: data?.accountName,
            acqId: data?.bin,
            amount: data?.amount,
            addInfo: data?.description,
            format: "text",
            template: "qr_only",
          },
          {
            headers: {
              "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
              "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
            },
          }
        )
        .then((resp) => {
          // setInfoVietQR({ ...resp.data.data });
          setInfoVietQR({ ...data, ...resp.data.data });

          toast.update(id, {
            render: "Tạo VietQR hoàn tất",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
          const contentType = "image/png";
          const b64Data = resp.data.data.qrDataURL.replace(
            "data:image/png;base64,",
            ""
          );

          const blob = base64StringToBlob(b64Data, contentType);
          // console.log(URL.createObjectURL(blob));
        })
        .catch((e) => console.log(e));
    }

    setOpenVietQR(true);
    dispatch(openBlock());
  };

  useEffect(() => {
    setInfoVietQR(null);
  }, [formik.values.SUM_AMNT]);

  // useEffect(() => {
  // console.log(infoVietQR);
  // }, [infoVietQR]);

  const handlePayment = async () => {
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
    navigate("/");
  };

  const handlePlus = (id) => {
    const productFind = formik.values.DETAIL.find(
      (item) => item.PRDCCODE == id
    );
    console.log(id);
    productFind.PRDCQTTY += 1;
    productFind.MNEYAMNT = productFind.PRDCQTTY * productFind.SALEPRCE;
    const body = {
      DCMNCODE: "APPCARTPRDC",
      HEADER: [
        {
          ...productFind,
          QUOMQTTY: productFind.PRDCQTTY,
          USERLOGIN: currentUser?.USERLGIN,
          PRDCIMAGE: productFind.PRDCIMGE,
        },
      ],
    };
    try {
      dispatch(increamentAmountProduct(body));
    } catch (error) {
      return;
    }
    updateFormik();
  };

  const handleSubstract = (id) => {
    setDisableButton(true);
    const productFind = formik.values.DETAIL.find(
      (item) => item.PRDCCODE == id
    );
    productFind.PRDCQTTY -= 1;
    productFind.MNEYAMNT = productFind.PRDCQTTY * productFind.SALEPRCE;
    if (productFind.PRDCQTTY == 0) {
      let result = formik.values.DETAIL.filter(
        (item) => item.PRDCCODE != productFind.PRDCCODE
      );
      formik.setFieldValue("DETAIL", result);
      handleDeleteProduct(productFind.PRDCCODE, productFind.KKKK0000);
    } else {
      // console.log(body);
      formik.setFieldValue("DETAIL", formik.values.DETAIL);
      const body = {
        DCMNCODE: "APPCARTPRDC",
        HEADER: [
          {
            ...productFind,
            QUOMQTTY: productFind.PRDCQTTY,
            USERLOGIN: currentUser?.USERLGIN,
            PRDCIMAGE: productFind.PRDCIMGE,
          },
        ],
      };
      dispatch(decreamentAmountProduct(body));
    }
    formik.setFieldValue(
      "SMPRQTTY",
      formik.values.DETAIL.filter((item) => item.checked == true).reduce(
        (value, currentValue) => value + currentValue.PRDCQTTY,
        0
      )
    );
  };

  const handleChangeChoose = (id) => {
    formik.values.DETAIL.find((item) => item.PRDCCODE == id).checked =
      !formik.values.DETAIL.find((item) => item.PRDCCODE == id).checked;
    if (formik.values.DETAIL.find((item) => item.checked == false)) {
      const detailCheckedTrue = formik.values.DETAIL;
      setChooseAll(false);
      formik.values.DETAIL = detailCheckedTrue;
    } else {
      setChooseAll(true);
    }

    updateFormik();
  };

  const handleClickAllProduct = () => {
    setChooseAll(!chooseAll);
    if (!chooseAll) {
      formik.values.DETAIL = formik.values.DETAIL.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      formik.values.DETAIL = formik.values.DETAIL.map((item) => ({
        ...item,
        checked: false,
      }));
      formik.values.SUM_CRAM = 0;
    }
    updateFormik();
  };

  // useEffect(() => {}, [chooseAll]);

  const handleDeleteProduct = (prdcCode, id) => {
    let result = formik.values.DETAIL.filter(
      (item) => item.PRDCCODE !== prdcCode
    );
    // if (result.length < 1) {
    //   result = [];
    // }
    dispatch(deleteProductFromCart({ PRDCCODE: prdcCode, id: id }));
    formik.values.DETAIL = result;
    if (result.length == 0) {
      setChooseAll(false);
    }
    console.log(result.length);
    updateFormik();
  };

  const handleBlurAmount = (e, id) => {
    console.log("Hllo");
    const productFind = formik.values.DETAIL.find(
      (item) => item.PRDCCODE == id
    );
    if (parseInt(e.target.value) == 0) {
      let result = formik.values.DETAIL.filter(
        (item) => item.PRDCCODE != productFind.PRDCCODE
      );
      formik.values.DETAIL = result;
      handleDeleteProduct(productFind.PRDCCODE, productFind.KKKK0000);
    } else {
      productFind.PRDCQTTY = parseInt(e.target.value);
      productFind.MNEYAMNT = productFind.PRDCQTTY * productFind.SALEPRCE;
      const body = {
        DCMNCODE: "APPCARTPRDC",
        HEADER: [
          {
            ...productFind,
            QUOMQTTY: productFind.PRDCQTTY,
            USERLOGIN: currentUser?.USERLGIN,
            PRDCIMAGE: productFind.PRDCIMGE,
          },
        ],
      };
      dispatch(changeAmoutProduct(body));
    }
    updateFormik();
  };

  const updateFormik = () => {
    const varFormik = formik.values.DETAIL.filter(
      (item) => item.checked == true
    );
    console.log(formik.values.DETAIL);
    formik.setValues({
      DETAIL: formik.values.DETAIL,
      SMPRQTTY: varFormik.reduce(
        (value, currentValue) => value + currentValue.PRDCQTTY,
        0
      ),
      RDTNCRAM:
        varFormik.length > 0
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
        varFormik.length > 0
          ? varFormik.reduce(
              (value, currentValue) =>
                value + currentValue.SALEPRCE * currentValue.PRDCQTTY,
              0
            )
          : 0,
      SUM_AMNT:
        varFormik.length > 0
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
  const handleChangeAmount = (e, id) => {
    console.log(e.target.value);
    formik.values.DETAIL.find((item) => item.PRDCCODE == id).PRDCQTTY =
      parseInt(e.target.value);
    updateFormik();
  };

  const changeForm = () => {};

  useEffect(() => {
    if (productCarts?.length > 0) {
      const detail = productCarts?.map((item) => {
        return {
          checked: formik.values.DETAIL.find((i) => i.PRDCCODE == item.PRDCCODE)
            ?.checked
            ? formik.values.DETAIL.find((i) => i.PRDCCODE == item.PRDCCODE)
                ?.checked
            : false,
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
        };
      });
      formik.setValues({
        DETAIL: [...detail],
      });
      setChooseAll(false);
      console.log(">>>>>>>>>>>>" + "load data");
    }
  }, [productCarts?.length]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [productCarts]);

  // console.log();

  useEffect(() => {
    setTimeout(() => {
      setDisableButton(false);
    }, 500);
  }, [disableButton == true]);
  return loading ? (
    <div className="grid grid-cols-1 xl:container xl:mx-auto mx-5 gap-x-2 mb-5">
      <LoadingView></LoadingView>
    </div>
  ) : (
    <div className="product-detail">
      <VietQRComponent
        open={openVietQR}
        value={infoVietQR}
        handleClose={() => {
          setOpenVietQR(false);
          dispatch(closeBlock());
        }}
      ></VietQRComponent>
      <img src="" alt="" />
      <InfoPage data={["Giỏ hàng", "Thanh toán và đặt hàng"]} />
      <FormikProvider value={formik}>
        <Form
          onSubmit={formik.handleSubmit}
          onChange={() => {
            changeForm();
          }}
        >
          <div className="grid grid-cols-1 xl:container xl:mx-auto mx-5 gap-x-2 mb-5">
            <div
              style={{ marginBottom: "10px" }}
              className="shadow-md border-t border-gray-200 h-[600px]  rounded-lg overflow-hidden border"
            >
              <div className="overflow-y-scroll h-full">
                {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-600 bg-gray-50 dark:text-gray-400 sticky top-0">
                    <th class="px-6 py-3 uppercase text-gray-dark flex gap-x-2">
                      <input
                        type="checkbox"
                        className="accent-first border-gray-light"
                        onChange={handleClickAllProduct}
                        value={chooseAll}
                      />
                      <span> Tất cả</span>
                    </th>

                    <th class="px-6 py-3 uppercase text-gray-dark">Số lượng</th>
                    <th class="px-6 py-3 uppercase text-gray-dark">Đơn giá</th>
                    <th class="px-6 py-3 uppercase text-gray-dark">
                      Thành tiền
                    </th>
                    <th class="px-6 py-3 w-fit uppercase text-gray-dark"></th>
                  </thead>

                  <tbody>
                    {formik.values.DETAIL.length <= 0
                      ? "Bạn chưa có sản phẩm nào trong giỏ hàng"
                      : formik.values.DETAIL.map((item) => {
                          return (
                            <tr
                              key={item["PRDCCODE"]}
                              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <td
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="flex items-center gap-x-2 w-fit">
                                  <input
                                    type="checkbox"
                                    className="accent-first border-gray-light"
                                    checked={item["checked"]}
                                    onClick={() =>
                                      handleChangeChoose(item["PRDCCODE"])
                                    }
                                  />
                                  <div className="border border-gray-300 rounded-xl overflow-hidden shadow-lg">
                                    <ImageFetch
                                      url={item["PRDCIMGE"]}
                                      className={"!size-20"}
                                    ></ImageFetch>
                                  </div>
                                  <span className="text-gray-dark text-wrap lg:w-60 line-clamp-2 w-0">
                                    {item["PRDCNAME"]}
                                  </span>
                                </div>
                              </td>
                              <td class="px-6 py-4">
                                <div className="flex items-center w-fit gap-x-1">
                                  <button
                                    disabled={disableButton}
                                    onClick={() =>
                                      handleSubstract(item["PRDCCODE"])
                                    }
                                    className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark cursor-pointer disabled:bg-slate-100"
                                  >
                                    -
                                  </button>

                                  <input
                                    disabled={disableButton}
                                    type="number"
                                    min={1}
                                    onBlur={(e) =>
                                      handleBlurAmount(e, item["PRDCCODE"])
                                    }
                                    onKeyDown={(e) => {
                                      if (e.keyCode === 13) {
                                        handleBlurAmount(e, item["PRDCCODE"]);
                                      }
                                    }}
                                    id={item["PRDCCODE"]}
                                    value={item["PRDCQTTY"]}
                                    onChange={(e) =>
                                      handleChangeAmount(e, item["PRDCCODE"])
                                    }
                                    className="border pl-2 w-14 h-6 rounded-md  outline-none text-xs text-gray-dark disabled:bg-slate-100"
                                  />

                                  <button
                                    disabled={disableButton}
                                    onClick={() => handlePlus(item["PRDCCODE"])}
                                    className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark cursor-pointer disabled:bg-slate-100"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td class="px-6 py-4">
                                <div className="font-semibold">
                                  {item["SALEPRCE"]?.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </div>
                              </td>
                              <td class="px-6 py-4">
                                <div className="font-semibold">
                                  {item["MNEYAMNT"]?.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </div>
                              </td>
                              <td class="px-6 py-4">
                                <button
                                  disabled={disableButton}
                                  className="text-white bg-red-400 w-fit px-7 py-2 rounded-md text-xs cursor-pointer disabled:bg-gray-400"
                                  onClick={() =>
                                    handleDeleteProduct(
                                      item["PRDCCODE"],
                                      item["KKKK0000"]
                                    )
                                  }
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table> */}
                <TableDetailProduct
                  handleBlurAmount={handleBlurAmount}
                  handleChangeAmount={handleChangeAmount}
                  handleDelete={handleDeleteProduct}
                  handleClickAll={handleClickAllProduct}
                  handleChoose={handleChangeChoose}
                  data={formik.values.DETAIL}
                  handlePlus={handlePlus}
                  maincode={"KKKK0000"}
                  name={"PRDCNAME"}
                  id={"PRDCCODE"}
                  image={"PRDCIMGE"}
                  saleoff={"DSCNRATE"}
                  price={"SALEPRCE"}
                  quantity={"PRDCQTTY"}
                  choose={"checked"}
                  chooseAll={chooseAll}
                ></TableDetailProduct>
              </div>
            </div>
            <div className="mb-5">
              <Wrapper>
                <div className="px-3 py-5">
                  <h5 className="font-semibold text-gray-dark mb-3">
                    Thông tin đơn hàng
                  </h5>

                  <div className="grid xl:grid-cols-3 grid-cols-2 gap-3 mb-5 px-5">
                    <div className="flex flex-col gap-y-3">
                      {/* TÊn người dùng  */}
                      <Input
                        name="MCUSTNME"
                        title={"Tên người dùng"}
                        value={formik.values.MCUSTNME}
                      ></Input>

                      {/* Địa chi  */}
                      <Input
                        name="CUSTADDR"
                        title={"Địa chỉ"}
                        value={formik.values.CUSTADDR}
                      ></Input>

                      {/* Số điện thoại  */}
                      <Input
                        name={"CUST_TEL"}
                        title={"Số điện thoại"}
                        value={formik.values.CUST_TEL}
                      ></Input>

                      {/* Ngày đặt hàng */}
                      <DatePicker
                        name="ODERDATE"
                        title="Ngày đặt hàng"
                        value={formik.values.ODERDATE}
                      ></DatePicker>

                      {/* Phân loại  */}
                      <Combobox
                        data={lstDcmnSbCd}
                        itemKey={"ITEMCODE"}
                        itemName="ITEMNAME"
                        name="DCMNSBCD"
                        title="Phân loại"
                        value={formik.values.DCMNSBCD}
                      ></Combobox>

                      {/* %Chiết khấu  */}
                      <Input
                        value={formik.values.RDTNRATE}
                        name="RDTNRATE"
                        title={"%Chiết khấu"}
                        type="number"
                      ></Input>
                      {/* Huê hồng khách hàng */}
                      <Input
                        value={formik.values.CSCMRATE}
                        name="CSCMRATE"
                        title={"Huê hồng khách hàng"}
                        // type={"number"}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      {/* Mã số thuế */}
                      <Input
                        value={formik.values.TAX_CODE}
                        name="TAX_CODE"
                        title={"Mã số thuế"}
                        // type={"number"}
                      ></Input>

                      {/* Thuế xuất */}
                      <Input
                        value={formik.values.VAT_RATE}
                        name="VAT_RATE"
                        title={"Thuế xuất"}
                        // type={"number"}
                      ></Input>

                      {/* Phương thức giao hàng  */}
                      <Combobox
                        data={lstDlvrMthd}
                        itemKey={"ITEMCODE"}
                        itemName="ITEMNAME"
                        name="DLVRMTHD"
                        title="Phương thức giao hàng"
                        value={formik.values.DLVRMTHD}
                      ></Combobox>

                      {/* Phương thức vận chuyển */}
                      <Combobox
                        data={lstDlvrType}
                        value={formik.values.DLVRTYPE}
                        name="DLVRTYPE"
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        title="Phương thức vận chuyển"
                      ></Combobox>

                      {/* Ngày giao hàng  */}
                      <DatePicker
                        value={formik.values.ODERDATE}
                        name="ODERDATE"
                        title="Ngày giao hàng"
                      ></DatePicker>

                      {/* Thời gian giao hàng */}
                      <Combobox
                        data={lstListHour}
                        value={formik.values.DLVRHOUR}
                        name="DLVRHOUR"
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        title="Giờ giao hàng"
                      ></Combobox>
                      {/* Nơi giao hàng */}
                      <Input
                        value={formik.values.DLVRPLCE}
                        name="DLVRPLCE"
                        title={"Nơi giao hàng"}
                        // type={"number"}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-y-3">
                      {/* Địa chỉ giao hàng */}
                      <Input
                        value={formik.values.DLVRADDR}
                        name="DLVRADDR"
                        title={"Địa chỉ giao hàng"}
                        // type={"number"}
                      ></Input>

                      {/* Người nhận hàng */}
                      <Input
                        value={formik.values.RCVREMPL}
                        name="RCVREMPL"
                        title={"Người nhận hàng"}
                        // type={"number"}
                      ></Input>

                      {/* Số điện thoại người nhận*/}
                      <Input
                        value={formik.values.RCVR_TEL}
                        name="RCVR_TEL"
                        title={"Số điện thoại người nhận"}
                        // type={"number"}
                      ></Input>
                      {/* Phương thức thanh toán  */}
                      <Combobox
                        data={lstinpCustOdMtPayMthd2}
                        value={formik.values.PAY_MTHD}
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        name="PAY_MTHD"
                        title="Phương thức thanh toán"
                      ></Combobox>

                      {/*Chu kì thanh toán  */}
                      <Combobox
                        data={lstTimeType}
                        value={formik.values.PYMNPERD}
                        itemKey={"ITEMCODE"}
                        itemName={"ITEMNAME"}
                        name="PYMNPERD"
                        title="Chu kì thanh toán"
                      ></Combobox>

                      {/* Thời hạn thanh toán*/}
                      <Input
                        value={formik.values.PYMNNUMB}
                        name="PYMNNUMB"
                        title={"Thời hạn thanh toán"}
                        // type={"number"}
                      ></Input>
                      {/* Diễn giải  */}
                      <TextArea
                        value={formik.values.NOTETEXT}
                        name="NOTETEXT"
                        title={"Diễn giải"}
                      ></TextArea>
                    </div>
                  </div>
                  {/* <div className="border-b gap-y-2 pb-3 mb-3">
                    <div className="flex items-start ml-auto flex-col w-48 gap-y-2">
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Tổng số sản phẩm:</span>{" "}
                        {
                          productCarts.filter((item) => item.choose == true)
                            .length
                        }
                      </div>
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">
                          Tổng số lượng sản phẩm:
                        </span>{" "}
                        {productCarts
                          .filter((item) => item.choose == true)
                          .reduce(
                            (value, currentValue) =>
                              value + currentValue["quantity"],
                            0
                          )}
                      </div>
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Tổng tiền:</span>{" "}
                        {productCarts
                          .filter((item) => item.choose == true)
                          .reduce(
                            (value, currentVaue) =>
                              value +
                              currentVaue["PRCEDSCN"] * currentVaue["quantity"],
                            0
                          )
                          .toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </div>
                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Thuế(VAT):</span>{" "}
                        9.800.000đ
                      </div>

                      <div className="text-gray-dark text-sm">
                        <span className="font-semibold">Khuyến mãi:</span>{" "}
                        9.800.000đ
                      </div>
                    </div>
                  </div> */}
                </div>
              </Wrapper>
            </div>
            <Wrapper>
              <div className="p-5">
                <h5 className="font-semibold text-gray-dark mb-3">
                  Phương thức thanh toán
                </h5>
                <div className="flex gap-x-5 gap-y-3 mb-3">
                  <div
                    className={`border  ${
                      stateButton == "vnpay"
                        ? "border-second shadow-sm shadow-second"
                        : "border-gray-300 shadow-lg"
                    } rounded-xl border-gray-300 h-28 w-28 p-3 cursor-pointe transition-colors duration-300`}
                    onClick={() => setStateButton("vnpay")}
                  >
                    <img
                      src={VNPay}
                      alt=""
                      className="w-full object-cover h-full"
                    />
                  </div>
                  <div
                    className={`border ${
                      stateButton == "vietqr"
                        ? "border-second shadow-sm shadow-second"
                        : "border-gray-300 shadow-lg"
                    } rounded-xl w-28 h-28 p-3 cursor-pointer  transition-colors duration-300`}
                    onClick={() => setStateButton("vietqr")}
                  >
                    <img
                      src={VietQR}
                      alt=""
                      className={`w-full object-contain h-full object-center`}
                    />
                  </div>
                </div>
                <div className="border-t pt-2 mt-2  border-gray-100 flex items-end flex-col mb-10 gap-y-3">
                  <div className="flex">
                    <span className="text-gray-dark font-medium">
                      Tổng số lượng:
                    </span>
                    <div className="w-64 text-end text-gray-dark">
                      {formik.values.SMPRQTTY ? formik.values.SMPRQTTY : 0}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-gray-dark font-medium">
                      Tổng tiền:
                    </span>
                    <div className="w-64 text-end text-gray-dark">
                      +
                      {formik.values.SUM_CRAM
                        ? formik.values.SUM_CRAM?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })
                        : Number(0).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-gray-dark font-medium">
                      Tiền chiết khấu:
                    </span>
                    <div className="w-64 text-end text-gray-dark">
                      -
                      {formik.values.RDTNCRAM
                        ? formik.values.RDTNCRAM?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })
                        : Number(0).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-gray-dark font-medium">
                      Tiền thuế:
                    </span>
                    <div className="w-64 text-end text-gray-dark">
                      {formik.values.VAT_CRAM}
                    </div>
                  </div>

                  <div className="flex border-t pt-3">
                    <span className="text-gray-dark font-medium">
                      Thành tiền:
                    </span>
                    <div className="w-64 text-end text-gray-dark font-bold">
                      {formik.values.SUM_AMNT
                        ? formik.values.SUM_AMNT?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })
                        : Number(0).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-y-3 items-center gap-x-2 justify-end">
                  <button
                    type="submit"
                    className="bg-second text-white rounded-md shadow-none px-5 py-2 border hover:text-white text-sm cursor-pointer"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </Wrapper>
          </div>
        </Form>
      </FormikProvider>
      {/* <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-semibold text-2xl text-first">
                Sản phẩm bán chạy
              </h4>
              <a href="#" className="text-gray-light">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div> */}
      {/* <ProductSlider
              data={products?.slice(5, 30)}
              id="PRDCCODE"
              name={"PRDCNAME"}
              image={"PRDCIMGE"}
              price={"PRCEDSCN"}
              reviews={"rating"}
              stars={"rating"}
              saleOff={""}
              sold={""}
    //         ></ProductSlider> */}
      //{" "}
    </div>
    //     </Wrapper>
    //   </div>
    // </div>
  );
};

export default PayDetailComponent;
