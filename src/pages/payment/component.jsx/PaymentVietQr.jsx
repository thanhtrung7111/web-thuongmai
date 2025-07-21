import React, { useEffect, useMemo, useRef, useState } from "react";
import ButtonForm from "../../../components/commonForm/ButtonForm";
import { usePayOS } from "payos-checkout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { unCheckAllProduct } from "../../../redux/reducer/cartReducer";
import {
  useDeleteOrderMutation,
  usePostNewReceiptMutation,
} from "../../../redux/query/orderQuery";
import moment from "moment";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useGenerateQRMutation } from "../../../redux/query/qrQuery";
import SpinnerLoading from "../../../components/commonAnimtaion/SpinnerLoading";
import {
  useExtractInvoiceMutation,
  useGetInvoiceMutation,
  useLoginInvoiceMutation,
} from "../../../redux/query/invoiceQuery";
function base64ToBlob(base64, mimeType = "application/pdf") {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length)
      .fill(0)
      .map((_, j) => slice.charCodeAt(j));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}
const PaymentVietQr = ({ infoPayemnt, openPayment, detailPayment }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageQr, setImageQr] = useState(null);
  const [infoInvoicePDF, setInfoInvoicePDF] = useState(null);
  const [openInfoInvoicePDF, setOpenInfoInvoicePDF] = useState(true);
  const componentRef = useRef();
  const [successPay, setSuccessPay] = useState({
    loading: false,
    code: "",
    id: "",
    cancel: false,
    orderCode: 0,
    status: "",
  });
  const [
    genearateQR,
    {
      data: dataGenerateQR,
      isLoading: isLoadingGenerateQR,
      isError: isErrorGenerateQR,
      isSuccess: isSuccessGenerateQR,
    },
  ] = useGenerateQRMutation();
  const [
    postNewReceipt,
    {
      data: dataNewReceipt,
      isLoading: isLoadingNewReceipt,
      isError: isErrorNewReceipt,
      isSuccess: isSuccessNewReceipt,
    },
  ] = usePostNewReceiptMutation();
  const [
    loginInvoice,
    {
      data: dataLoginInvoice,
      isLoading: isLoadingLoginInvoice,
      isError: isErrorLoginInvoice,
      isSuccess: isSuccessLoginInvoice,
    },
  ] = useLoginInvoiceMutation();

  const [
    extractInvoice,
    {
      data: dataExtractInvoice,
      isLoading: isLoadingExtractInvoice,
      isError: isErrorExtractInvoice,
      isSuccess: isSuccessExtractInvoice,
    },
  ] = useExtractInvoiceMutation();
  const [
    getInvoice,
    {
      data: dataGetInvoice,
      isLoading: isLoadingGetInvoice,
      isError: isErrorGetInvoice,
      isSuccess: isSuccessGetInvoice,
    },
  ] = useGetInvoiceMutation();
  const [
    deleteOrder,
    {
      data: dataDeleteOrder,
      isLoading: isLoadingDeleteOrder,
      isError: isErrorDeleteOrder,
      isSuccess: isSuccessDeleteOrder,
    },
  ] = useDeleteOrderMutation();
  const navigate = useNavigate();
  const payOsConfig = useMemo(
    () => ({
      RETURN_URL: "http://localhost:5173/",
      ELEMENT_ID: "info_vietqr",
      CHECKOUT_URL: infoPayemnt?.checkoutUrl,
      embedded: false,
      onSuccess: (event) => {
        console.log("Payment success", event);
        setSuccessPay(event);
        handlePaymentSuccess();
        dispatch(unCheckAllProduct());
      },
      onCancel: (event) => {
        console.log("Payment cancel", event);
      },
      onExit: (event) => {
        console.log("Payment exit", event);
      },
    }),
    [infoPayemnt, dispatch]
  );
  const { open, exit } = usePayOS(payOsConfig);

  const handlePaymentSuccess = async () => {
    const body = {
      //== Nhóm chính thể hiện - Mã nhóm: 01
      MAINCODE: "",
      MAINDATE: moment(new Date()).format("yyyy-MM-DD"),
      CUSTNAME: currentUser?.USERNAME,
      CUSTPHNE: currentUser?.USER_TEL,
      LCTNCODE: "001",
      WRHSCODE: detailPayment?.WRHSCODE,
      CNTRCODE: "",
      CUSTCODE: detailPayment?.CUSTCODE,
      CUOMCODE: "VND",
      CUOMRATE: 1,
      EMPLCODE: "PHUC",
      VAT_RATE: detailPayment?.VAT_RATE,
      VAT_CRAM: detailPayment?.VAT_CRAM,
      SMCRAM_V: detailPayment?.SUM_CRAM,
      MEXLNNTE: detailPayment?.NOTETEXT,
      ODERCODE: detailPayment?.ODERCODE,
      CUSTADDR: detailPayment?.CUSTADDR,
      SMMNCRAM: detailPayment?.SUM_CRAM, //== Tiền hàng,
      SUM_CRAM: detailPayment?.SUM_CRAM - detailPayment?.VAT_CRAM,
      SHOPCODE: "",
      //== Nhóm không thể hiện - Mã nhóm: 02
      SRVCAMNT: 0,
      COMPCODE: "PMC",
      DCMNCODE: "HDBHD",
      VAT_AMNT: detailPayment?.VAT_CRAM * detailPayment?.CUOMRATE, //== VAT_CrAm*CUOMRate,
      DCNTAMNT: detailPayment?.DCNTAMNT, //== DcntCrAm*CUOMRate,
      SMAMNT_V: detailPayment?.SUM_AMNT * detailPayment?.CUOMRATE, //== SmCrAm_V*CUOMRate,
      SUM_AMNT: detailPayment?.SUM_AMNT * detailPayment?.CUOMRATE, //== Sum_CrAm*CUOMRate,
      PYMNAMNT: detailPayment?.SUM_AMNT * detailPayment?.CUOMRATE, //== PymnCrAm*CUOMRate,
      CMNSAMNT: 0, //== CmnsCrAm*CUOMRate,
      DLVRCODE: "",
      DLVRSTRT: currentUser?.ADDRSTRT,
      RDTNAMNT: detailPayment?.RDTNCRAM * detailPayment?.CUOMRATE, //== RdtnCrAm*CUOMRate,
      DLVRAMNT: 0, //== DlvrCrAm*CUOMRate,
      SMMNAMNT: detailPayment?.SUM_CRAM * detailPayment?.CUOMRATE, //== SmMnCrAm*CUOMRate,
      SRC_DATA: 1,
      IVTRCODE: "",
      CUSTWARD: detailPayment?.DLVRWARD,
      //== Nhóm tùy chọn header 2 - Mã nhóm: 12
      VAT_CUST: detailPayment?.RCVREMPL, //== Tên khách hàng trên hóa đơn,
      VAT_ADDR: detailPayment?.DLVRPLCE, //== Địa chỉ trên hóa đơn,
      VAT_CODE: "",
      //== Nhóm tùy chọn header 3 - Mã nhóm: 13
      INVCSIGN: "",
      INVCDATE: moment(new Date()).format("yyyy-MM-DD"),
      INVCTEMP: "",
      INVCCODE: "",
      //== Nhóm tùy chọn header 4 - Mã nhóm: 14
      DLVRDATE: moment(new Date()).format("yyyy-MM-DD"),
      DLVRADDR: detailPayment?.DLVRPLCE,
      DLVRNOTE: detailPayment?.NOTETEXTF,
      RLTNOBJC: detailPayment?.RCVREMPL,
      RLTN_TEL: detailPayment?.RCVR_TEL,
      //== Nhóm tùy chọn header 5 - Mã nhóm: 15
      DLVRCITY: detailPayment?.DLVRPRVN,
      DLVRDIST: detailPayment?.DLVRDIST,
      DLVRWARD: detailPayment?.DLVRWARD,
      DLVRNUMB: detailPayment?.DLVRNUMB,
      //== Nhóm tùy chọn header 6 - Mã nhóm: 16
      //== Nhóm tùy chọn header 7 - Mã nhóm: 17
      DLVRCRAM: 0,
      DLVRRATE: 0,
      //== Nhóm tùy chọn header 8 - Mã nhóm: 18
      RDTNRATE: 0,
      RDTNCRAM: 0,
      //== Nhóm tùy chọn header 9 - Mã nhóm: 19
      CMNSRATE: 0,
      CMNSCRAM: 0,
      //== Nhóm tùy chọn header 10 - Mã nhóm: 20
      DCNTRATE: 0,
      DCNTCRAM: 0,
      //== Nhóm tùy chọn header 12 - Mã nhóm: 22
      PYMNCRAM: detailPayment?.SUM_AMNT,
      PAY_MTHD: detailPayment?.PAY_MTHD,
      //== Nhóm tùy chọn header 13 - Mã nhóm: 23
      DCMNSBCD: detailPayment?.DCMNSBCD,
      //== Nhóm tùy chọn header 14 - Mã nhóm: 24
      PRDCTYPE: detailPayment?.PRDCTYPE,
      //== Nhóm tùy chọn header 16 - Mã nhóm: 25
      SALEMEAN: 2,
      //== Nhóm tùy chọn header 17 - Mã nhóm: 26
      //== Nhóm tùy chọn header 15 - Mã nhóm: 41
      CHNLCODE: detailPayment?.CHNLCODE,
      DETAIL: [
        ...detailPayment?.DETAIL.map((item) => ({
          SRSLCODE: 1,
          PRDCQTTY: item?.QUOMQTTY,
          PRDCCRPR: item?.SALEPRCE, //== Đơn giá chưa có VAT,
          MEXLNNTE: item?.NOTETEXT_DT,
          MNEYCRAM: item?.MNEYCRAM, //== Thành tiền,
          DISCRATE: item?.DISCRATE,
          DCPRCRAM: item?.DCPRCRAM,
          PRCECRAM: item?.PRCECRAM,
          PRDCNAME: item?.PRDCNAME,
          PRDCCODE: item?.PRDCCODE,
          SORTCODE: item?.SORTCODE,
          QUOMCODE: item?.QUOMCODE,
          //== Nhóm không thể hiện - Mã nhóm: 02
          COMPCODE: "PMC",
          DCPVATAM: item?.DCPRCRAM, //== DcpVATCr*CUOMRate,
          PRCVATAM: item?.MNEYCRAM, //== PrcVATCr*CUOMRate,
          VAT_AMNT: detailPayment?.VAT_AMNT, //== VAT_CrAm_D*CUOMRate,
          MNAM_VAT: item?.MNEYAMNT * detailPayment?.CUOMRATE, //== MnCr_VAT*CUOMRate,
          PRDCPRCE: detailPayment?.CUOMRATE * item?.SALEPRCE, //== PrdcCrPr*CUOMRate(Đơn giá chưa có VAT(VNĐ)),
          LCTNCODE: "001",
          MNEYAMNT: item?.MNEYAMNT, //== MneyCrAm*CUOMRate,
          DCPRAMNT: item?.DCPRCRAM * detailPayment?.CUOMRATE, //== DcPrCrAm*CUOMRate,
          PRCEAMNT: item?.PRCECRAM * detailPayment?.CUOMRATE, //== PrceCrAm*CUOMRate,
          MAINCODE: "",
          MAINDATE: moment(new Date()).format("yyyy-MM-DD"),
          //== Nhóm tùy chọn detail 1 - Mã nhóm: 31
          PRCE_VAT:
            item?.SALEPRCE + (item?.SALEPRCE * detailPayment?.VAT_RATE) / 100, //== Đơn giá có VAT,
          //== Nhóm tùy chọn detail 2 - Mã nhóm: 32
          PRCVATCR:
            item?.SALEPRCE +
            (item?.SALEPRCE * detailPayment?.VAT_RATE) / 100 -
            (item?.SALEPRCE * item?.DISCRATE) / 100, //== Giá sau chiết khấu (2),
          MNCR_VAT:
            item?.MNEYCRAM + (item?.MNEYCRAM * detailPayment?.VAT_RATE) / 100, //== Thành tiền (2),
          DCPVATCR: item?.DCPRCRAM - item?.DCPRCRAM * detailPayment?.VAT_RATE, //== Tiền chiết khấu (2),
          //== Nhóm tùy chọn detail 3 - Mã nhóm: 33
          VAT_CRAM:
            ((item?.MNEYCRAM * detailPayment?.VAT_RATE) / 100) * item.QUOMQTTY,
          VAT_RATE: detailPayment?.VAT_RATE,
          //== Nhóm tùy chọn detail 4 - Mã nhóm: 34
          //== Nhóm tùy chọn detail 5 - Mã nhóm: 35
          BTCHCODE: "",
        })),

        //== Nhóm chính thể hiện - Mã nhóm: 01
      ],
    };
    try {
      await postNewReceipt(body).unwrap();
      await handleExtractInvocie();
    } catch (error) {}
  };

  const handleExtractInvocie = async () => {
    console.log(detailPayment);
    // return;
    const bodyLogin = {
      username: "0100109106-712",
      password: "123456a@A",
    };
    const result = await loginInvoice(bodyLogin).unwrap();
    const dataExtract = {
      generalInvoiceInfo: {
        invoiceType: "1",
        templateCode: "1/552",
        invoiceSeries: "C25MFI",
        currencyCode: "VND",
        adjustmentType: "1",
        paymentStatus: true,
        cusGetInvoiceRight: true,
      },
      sellerInfo: {
        sellerLegalName: "Công ty Giải pháp tin học FIRSTEMS",
        sellerTaxCode: "0100109106-712",
        sellerAddressLine:
          "56 Đường số 3, Khu Trung Sơn, Bình Hưng, Tp. Hồ Chí Minh",
        sellerPhoneNumber: "0123456789",
        sellerFaxNumber: "0123456789",
        sellerEmail: "email@gmail.com",
        sellerBankName: "Ngân hàng ",
        sellerBankAccount: "012345678901",
        sellerDistrictName: "",
        sellerCityName: "Thành Phố Hồ Chí Minh",
        sellerCountryCode: "84",
        sellerWebsite: "",
      },
      buyerInfo: {
        buyerName: detailPayment?.RCVREMPL,
        buyerLegalName: detailPayment?.RCVREMPL,
        //   "buyerTaxCode": "0100109106",
        buyerAddressLine: detailPayment?.CUSTADDR,
        buyerPostalCode: "2342324323",
        buyerDistrictName: detailPayment?.DLVRPLCE,
        buyerCityName: detailPayment?.DLVRPRVN,
        buyerCountryCode: "84",
        buyerPhoneNumber: detailPayment?.RCVR_TEL,
        buyerFaxNumber: "",
        buyerEmail: "",
        buyerBankName: "",
        buyerBankAccount: "",
        buyerIdType: "",
        buyerIdNo: "",
        buyerCode: "",
        buyerBirthDay: "",
      },
      payments: [
        {
          paymentMethodName: "Chuyển khoản",
        },
      ],
      taxBreakdowns: [
        {
          taxPercentage: 10,
          taxableAmount: 3952730,
          taxAmount: 395273,
        },
      ],

      itemInfo: [
        ...detailPayment?.DETAIL.map((item, index) => ({
          // SRSLCODE: 1,
          // PRDCQTTY: item?.QUOMQTTY,
          // PRDCCRPR: item?.SALEPRCE, //== Đơn giá chưa có VAT,
          // MEXLNNTE: item?.NOTETEXT_DT,
          // MNEYCRAM: item?.MNEYCRAM, //== Thành tiền,
          // DISCRATE: item?.DISCRATE,
          // DCPRCRAM: item?.DCPRCRAM,
          // PRCECRAM: item?.PRCECRAM,
          // PRDCNAME: item?.PRDCNAME,
          // PRDCCODE: item?.PRDCCODE,
          // SORTCODE: item?.SORTCODE,
          // QUOMCODE: item?.QUOMCODE,
          // //== Nhóm không thể hiện - Mã nhóm: 02
          // COMPCODE: "PMC",
          // DCPVATAM: item?.DCPRCRAM, //== DcpVATCr*CUOMRate,
          // PRCVATAM: item?.MNEYCRAM, //== PrcVATCr*CUOMRate,
          // VAT_AMNT: detailPayment?.VAT_AMNT, //== VAT_CrAm_D*CUOMRate,
          // MNAM_VAT: item?.MNEYAMNT * detailPayment?.CUOMRATE, //== MnCr_VAT*CUOMRate,
          // PRDCPRCE: detailPayment?.CUOMRATE * item?.SALEPRCE, //== PrdcCrPr*CUOMRate(Đơn giá chưa có VAT(VNĐ)),
          // LCTNCODE: "001",
          // MNEYAMNT: item?.MNEYAMNT, //== MneyCrAm*CUOMRate,
          // DCPRAMNT: item?.DCPRCRAM * detailPayment?.CUOMRATE, //== DcPrCrAm*CUOMRate,
          // PRCEAMNT: item?.PRCECRAM * detailPayment?.CUOMRATE, //== PrceCrAm*CUOMRate,
          // MAINCODE: "",
          // MAINDATE: moment(new Date()).format("yyyy-MM-DD"),
          // //== Nhóm tùy chọn detail 1 - Mã nhóm: 31
          // PRCE_VAT:
          //   item?.SALEPRCE + (item?.SALEPRCE * detailPayment?.VAT_RATE) / 100, //== Đơn giá có VAT,
          // //== Nhóm tùy chọn detail 2 - Mã nhóm: 32
          // PRCVATCR:
          //   item?.SALEPRCE +
          //   (item?.SALEPRCE * detailPayment?.VAT_RATE) / 100 -
          //   (item?.SALEPRCE * item?.DISCRATE) / 100, //== Giá sau chiết khấu (2),
          // MNCR_VAT:
          //   item?.MNEYCRAM + (item?.MNEYCRAM * detailPayment?.VAT_RATE) / 100, //== Thành tiền (2),
          // DCPVATCR: item?.DCPRCRAM - item?.DCPRCRAM * detailPayment?.VAT_RATE, //== Tiền chiết khấu (2),
          // //== Nhóm tùy chọn detail 3 - Mã nhóm: 33
          // VAT_CRAM:
          //   ((item?.MNEYCRAM * detailPayment?.VAT_RATE) / 100) *
          //   item.QUOMQTTY,
          // VAT_RATE: detailPayment?.VAT_RATE,
          // //== Nhóm tùy chọn detail 4 - Mã nhóm: 34
          // //== Nhóm tùy chọn detail 5 - Mã nhóm: 35

          lineNumber: index + 1,
          itemCode: item?.PRDCCODE,
          itemName: item?.PRDCNAME,
          unitName: "Chiếc",
          unitPrice: item?.SALEPRCE,
          quantity: item?.QUOMQTTY,
          selection: 1,
          itemTotalAmountWithoutTax: item?.SALEPRCE * item?.QUOMQTTY,
          taxPercentage: detailPayment?.VAT_RATE,
          taxAmount:
            ((item?.MNEYCRAM * detailPayment?.VAT_RATE) / 100) * item.QUOMQTTY,
          discount: null,
          discount2: null,
          itemDiscount: 0,
          itemNote: null,
          batchNo: null,
          expDate: null,
        })),

        //== Nhóm chính thể hiện - Mã nhóm: 01
      ],
      summarizeInfo: {
        extraName: "{ Tiền phí đặc biệt, Tiền phí,  } ",
        extraValue: "{ 00 ,00,}",
      },
    };

    const rsltExtractInvoice = await extractInvoice({
      data: { ...dataExtract },
      taxCode: "0100109106-712",
      token: result?.access_token,
    }).unwrap();

    const resltGetInvoice = await getInvoice({
      data: {
        supplierTaxCode: "0100109106-712",
        // invoiceNo: rsltExtractInvoice?.result?.invoiceNo,
        invoiceNo: "C25MFI72",
        templateCode: "1/552",
        fileType: "PDF",
      },
      token: result?.access_token,
    }).unwrap();
    const resultFileToBytes = resltGetInvoice.fileToBytes;
    setInfoInvoicePDF({
      supplierTaxCode: "0100109106-712",
      invoiceNo: rsltExtractInvoice?.result?.invoiceNo,
      // invoiceNo: "C25MFI72",
      templateCode: "1/552",
      fileType: "PDF",
      fileToBytes: resltGetInvoice?.fileToBytes,
      fileName: resltGetInvoice?.fileName,
    });
    if (resultFileToBytes == null) {
      toast.warning("Không thể lấy file hóa đơn. Vui lòng thử lại!", {
        autoClose: 1500,
        position: "top-center",
        hideProgressBar: true,
      });
    }
    setSuccessPay({ ...successPay, status: "success" });
  };

  // const shareImage = async () => {
  //   const img = await fetch(value.qrDataURL).then((res) => res.blob());
  //   const metadata = {
  //     contentType: "image/png",
  //   };
  //   const storageRef = ref(storage, `images/${value?.orderCode}`);
  //   const uploadTask = uploadBytesResumable(storageRef, img, metadata);
  //   console.log(URL.createObjectURL(img));
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // Xử lý trường hợp tải ảnh thất bại
  //     },
  //     () => {
  //       // Xử lý trường hợp tải ảnh thành công
  //       //  Lấy về đường link của ảnh vừa tải thành công
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         // reset các trạng thái sau khi tải ảnh thành công
  //         postImage({
  //           MESSTYPE: 12,
  //           OBJCTYPE: 0,
  //           OBJCCODE: "000005",

  //           MAILSBJC: "",
  //           MESSTEXT: "QR Code thanh toán hóa đơn " + value?.orderCode,

  //           LISTIMGE: "",

  //           LISTFILE: "",
  //           URL_IMGE: downloadURL,
  //           URL_FILE: "",

  //           DCMNCODE: "",
  //           KEY_CODE: "",

  //           MAINCODE: "",
  //           STTESIGN: 0,
  //           EMPLCODE: "",

  //           CNTNTYPE: 0,
  //           CNTNCODE: "",
  //           CNTN_ADD: "",
  //         });
  //       });
  //     }
  //   );
  //   toast.success("Chia sẻ thành công!", {
  //     autoClose: 1000,
  //   });
  // };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: infoPayemnt?.orderCode,
    onAfterPrint: () => toast.success("In QR Code thành công"),
    onPrintError: () => toast.error("In QR Code thất bại"),
    // pageStyle: "{ size: 2.5in 4in }",
  });

  useEffect(() => {
    if (openPayment) {
      console.log("helo");
      open();
    }
  }, [openPayment, infoPayemnt]);
  console.log(infoPayemnt);
  const handleCancel = async () => {
    await axios
      .post(
        `https://api-merchant.payos.vn/v2/payment-requests/${infoPayemnt.paymentLinkId}/cancel`,
        {
          cancellationReason: "Cancel Payment",
        },
        {
          headers: {
            "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
            "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
          },
        }
      )
      .then((response) => {
        setSuccessPay({
          ...successPay,
          cancel: true,
          status: response.data?.data.status,
        });
        console.log(response);
        exit();
        dispatch(unCheckAllProduct());
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log(dataNewReceipt);
  }, [dataNewReceipt]);
  useEffect(() => {
    const fetchImageQR = async () => {
      try {
        await genearateQR({
          accountNo: infoPayemnt?.accountNumber,
          accountName: infoPayemnt?.accountName,
          acqId: infoPayemnt?.bin,
          amount: infoPayemnt?.amount,
          addInfo: infoPayemnt?.description,
          format: "text",
          template: "compact",
        });
      } catch (error) {
        return;
      }
    };
    fetchImageQR();
  }, [infoPayemnt]);
  useEffect(() => {
    if (isSuccessGenerateQR) {
      setImageQr(dataGenerateQR?.data?.qrDataURL);
    }
  }, [isSuccessGenerateQR]);

  const handleDownloadInvoice = () => {
    const byteCharacters = atob(infoInvoicePDF?.fileToBytes);
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Tạo link tải
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = infoInvoicePDF?.fileName;
    link.click();
    // Giải phóng bộ nhớ
    URL.revokeObjectURL(link.href);
  };

  const handleRefreshInvoice = async () => {
    const bodyLogin = {
      username: "0100109106-712",
      password: "123456a@A",
    };
    const result = await loginInvoice(bodyLogin).unwrap();
    const resltGetInvoice = await getInvoice({
      data: {
        supplierTaxCode: infoInvoicePDF.supplierTaxCode,
        // invoiceNo: rsltExtractInvoice?.result?.invoiceNo,
        invoiceNo: infoInvoicePDF.invoiceNo,
        templateCode: infoInvoicePDF.templateCode,
        fileType: "PDF",
      },
      token: result?.access_token,
    }).unwrap();
    const resultFileToBytes = resltGetInvoice.fileToBytes;
    setInfoInvoicePDF({
      supplierTaxCode: "0100109106-712",
      invoiceNo: infoInvoicePDF.invoiceNo,
      templateCode: infoInvoicePDF.templateCode,
      fileType: "PDF",
      fileToBytes: resltGetInvoice?.fileToBytes,
      fileName: resltGetInvoice?.fileName,
    });
  };
  return (
    <div className="w-full h-full">
      <div id="info_vietqr" hidden></div>
      <div
        className={`grid grid-cols-2 w-[200%] h-full overflow-hidden ${
          successPay.status == "" ? "translate-x-0" : "-translate-x-1/2"
        } transition-transform duration-200`}
      >
        <div className="w-full h-full flex flex-col">
          {isLoadingGenerateQR || imageQr == null ? (
            <div className="flex items-center gap-x-3 justify-center py-5">
              <SpinnerLoading width={8} height={8}></SpinnerLoading>{" "}
              <span className="text-gray-600 italic text-xl">
                {" "}
                Đang tải thông tin thanh toán...
              </span>
            </div>
          ) : (
            <>
              <h5 className="text-gray-500 italic text-sm ml-10">
                Vui lòng thanh toán theo thông tin bên dưới!
              </h5>

              <div
                className="w-full flex-auto flex justify-center gap-x-10 px-5 py-5"
                ref={componentRef}
              >
                <div className="p-3 border rounded-xl flex flex-col items-center">
                  <div className="justify-between flex mb-4">
                    <div className="flex justify-start gap-x-6">
                      <button
                        className="text-gray-dark cursor-pointer text-sm"
                        onClick={handlePrint}
                      >
                        <i class="ri-printer-line text-xl"></i> Print
                      </button>
                      <a
                        download={infoPayemnt?.orderCode}
                        className="text-gray-dark cursor-pointer text-sm"
                        href={imageQr}
                      >
                        <i class="ri-download-2-line text-xl"></i> Lưu ảnh
                      </a>
                      <button
                        className="text-gray-dark cursor-pointer text-sm"
                        // onClick={shareImage}F
                      >
                        <i class="ri-share-forward-line text-gray-dark"></i>{" "}
                        Chia sẻ
                      </button>
                    </div>
                  </div>
                  <img src={imageQr} alt="" className="w-auto flex-auto" />
                </div>

                <div>
                  <h5 className="text-2xl text-gray-700 italic font-semibold   self-centers mb-5">
                    Thông tin thanh toán
                  </h5>
                  <div className="flex flex-col gap-y-3">
                    <p>
                      <span className="text-gray-600 font-semibold">
                        Tên tài khoản:
                      </span>{" "}
                      {infoPayemnt?.accountName}
                    </p>
                    <p>
                      <span className="text-gray-600 font-semibold">
                        Số tiền:
                      </span>{" "}
                      {infoPayemnt?.amount?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <p>
                      <span className="text-gray-600 font-semibold">
                        Nội dung chuyển khoản:
                      </span>{" "}
                      {infoPayemnt?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <ButtonForm
                  label={"Hủy thanh toán"}
                  className="!bg-red-500 !w-fit ml-auto"
                  type="button"
                  // onClick={() => handleCancel()}
                  onClick={() => handlePaymentSuccess()}
                ></ButtonForm>
              </div>
            </>
          )}
        </div>

        <div className="w-full h-full flex flex-col pt-20">
          <h5 className="text-gray-500 italic mx-auto mb-5 text-2xl">
            {successPay.status == "PAID"
              ? isLoadingNewReceipt
                ? "Đang xử lí thanh toán..."
                : isSuccessNewReceipt
                ? "Thanh toán thành công!"
                : "Thanh toán thành công. Server lỗi cập nhật!"
              : successPay.status == "CANCELLED"
              ? "Đã hủy thanh toán..."
              : "Thanh toán không thành công"}
          </h5>
          <div className="flex justify-center gap-x-5">
            <ButtonForm
              label={"Tiếp tục mua sắm"}
              className="!bg-red-400 !w-fit"
              type="button"
              onClick={() => navigate("/products")}
            ></ButtonForm>
            {successPay.status == "PAID" && (
              <ButtonForm
                label={"Xem thông tin đơn hàng"}
                className="!bg-second !w-fit"
                type="button"
                onClick={() => navigate("/personal?tab=order")}
              ></ButtonForm>
            )}
          </div>{" "}
          {/* {infoInvoicePDF && ( */}
          <div
            className="text-slate-500 mx-auto mt-3 italic cursor-pointer hover:border-b"
            // onClick={() => handleDownloadInvoice()}
          >
            Thông tin hóa đơn điện tử
            <i
              className="ri-download-2-line"
              onClick={handleDownloadInvoice}
            ></i>
            {infoInvoicePDF?.fileToBytes == null && (
              <i
                className="ri-loop-left-fill"
                onClick={handleRefreshInvoice}
              ></i>
            )}
          </div>
          {/* )} */}
        </div>
      </div>{" "}
      {/* {openInfoInvoicePDF && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-50"></div>
      )} */}
    </div>
  );
};

export default PaymentVietQr;
