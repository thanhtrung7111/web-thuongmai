import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
// import { closeBlock } from "../../redux/reducer/popupReducer";
import { base64StringToBlob } from "blob-util";
import { postImage } from "../../api/api";
import { storage } from "../../firebase/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const VietQRComponent = ({ open, handleOpen, handleClose, value }) => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: value?.orderCode,
    onAfterPrint: () =>
      toast.success("In QR Code thành công", { position: "top-center" }),
    onPrintError: () =>
      toast.error("In QR Code thất bại", { position: "top-center" }),
    // pageStyle: "{ size: 2.5in 4in }",
  });

  const handleTranfer = async () => {
    const data = await axios
      .get(
        `https://api-merchant.payos.vn/v2/payment-requests/${value?.orderCode}`,
        {
          headers: {
            "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
            "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
          },
        }
      )
      .then((resp) => resp.data.data)
      .catch((e) => console.log(e));
    // dispatch(closeBlock());
    window.scroll(0, 0);
    navigate(`/status_payvietQR?response=${data.status}`);
  };

  const copyClipboard = (value, content) => {
    navigator.clipboard.writeText(value);
    toast.success("Copy " + content + " thành công!", {
      autoClose: 1000,
      position: "top-center",
    });
  };

  const changeFile = (e) => {
    setFileChoose(e.target.files[0]);
    console.log(e.target.files);
  };

  const shareImage = async () => {
    // const tokenZalo =
    //   "deyWB9MkZ1oVZ2KYdQoC4vsD9oITi8XDsjPO6vo1YrR1vImLghtiOklsInVjjA8bdyXfLic8jpEetnb1hwF7DQJcR4J4mOaPk89QRS2We1h4tN54plxQ9ykNT6_1vRWQiPLXUz7ebH6BWbjaoVQe99AgPn7nzR5cWuGM88Z6p6gBbsiAtVENFRQsMGZZnhyxWUmLJCYCnW2BvWzXYRRI5Etf2rRckSm_aUO32PF3zadBc3e5bVpaSPIeI2Nqmfzhhk18EisZht2srGS4ph_kOAhrEbUjkVeQgSCmB--SxXgHzI99zRwB89RhH7ISZP0vojr8UfkMi0_gn61kl-2t6UAnUtcem8mAuO9VRxlZgoFalmP5dEBS2CZ54roEuBWMzSDhUPwrda_zy51wdjl-IEgw17YymzyICnEV1vcoZH8";
    const img = await fetch(value.qrDataURL).then((res) => res.blob());
    // console.log(img);

    // const formData = new FormData();
    // formData.append("file", img);
    // const data = await axios
    //   .post("https://openapi.zalo.me/v2.0/oa/upload/image", formData, {
    //     headers: {
    //       access_token: tokenZalo,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((resp) => resp.data.data)
    //   .catch((e) => console.log(e));

    // console.log(data);
    // const dataZalo = {
    //   // recipient: {
    //   //   user_id: "5770170375254184499",
    //   // },
    //   // message: {
    //   //   attachment: {
    //   //     type: "template",
    //   //     payload: {
    //   //       template_type: "transaction_order",
    //   //       language: "VI",
    //   //       elements: [
    //   //         {
    //   //           attachment_id: data?.attachment_id,
    //   //           type: "banner",
    //   //         },
    //   //         {
    //   //           type: "header",
    //   //           content: "Thông tin thanh toán " + "#" + value?.orderCode,
    //   //           align: "left",
    //   //         },
    //   //         {
    //   //           type: "text",
    //   //           align: "left",
    //   //           content: "Đơn hàng đã được xác nhận.",
    //   //         },
    //   //         {
    //   //           type: "table",
    //   //           content: [
    //   //             {
    //   //               value: value?.orderCode,
    //   //               key: "Mã đơn hàng",
    //   //             },
    //   //             {
    //   //               key: "STK",
    //   //               value: value?.accountNumber,
    //   //             },
    //   //             {
    //   //               key: "Tên tài khoản",
    //   //               value: value?.accountName,
    //   //             },
    //   //             {
    //   //               key: "Nội dung",
    //   //               value: value?.description,
    //   //             },
    //   //             {
    //   //               value: value?.amount?.toLocaleString("vi", {
    //   //                 style: "currency",
    //   //                 currency: "VND",
    //   //               }),
    //   //               key: "Tổng tiền",
    //   //             },
    //   //           ],
    //   //         },
    //   //         {
    //   //           type: "text",
    //   //           align: "center",
    //   //           content: "Vui lòng thanh toán trước 15 phút",
    //   //         },
    //   //       ],
    //   // buttons: [
    //   //   {
    //   //     title: "Kiểm tra lộ trình - default icon",
    //   //     image_icon: "",
    //   //     type: "oa.open.url",
    //   //     payload: {
    //   //       url: "https://oa.zalo.me/home",
    //   //     },
    //   //   },
    //   //   {
    //   //     title: "Xem lại giỏ hàng",
    //   //     image_icon:
    //   //       "wZ753VDsR4xWEC89zNTsNkGZr1xsPs19vZF22VHtTbxZ8zG9g24u3FXjZrQvQNH2wMl1MhbwT5_oOvX5_szXLB8tZq--TY0Dhp61JRfsAWglCej8ltmg3xC_rqsWAdjRkctG5lXzAGVlQe9BhZ9mJcSYVIDsc7MoPMnQ",
    //   //     type: "oa.query.show",
    //   //     payload: "kiểm tra giỏ hàng",
    //   //   },
    //   //   {
    //   //     title: "Liên hệ tổng đài",
    //   //     image_icon:
    //   //       "gNf2KPUOTG-ZSqLJaPTl6QTcKqIIXtaEfNP5Kv2NRncWPbDJpC4XIxie20pTYMq5gYv60DsQRHYn9XyVcuzu4_5o21NQbZbCxd087DcJFq7bTmeUq9qwGVie2ahEpZuLg2KDJfJ0Q12c85jAczqtKcSYVGJJ1cZMYtKR",
    //   //     type: "oa.open.phone",
    //   //     payload: {
    //   //       phone_code: "84123456789",
    //   //     },
    //   //   },
    //   // ],
    //   //     },
    //   //   },
    //   // },
    // };

    // await axios
    //   .post("https://openapi.zalo.me/v3.0/oa/message/transaction", dataZalo, {
    //     headers: {
    //       access_token: tokenZalo,
    //     },
    //   })
    //   .then((resp) => console.log(resp.data))
    //   .catch((e) => console.log(e));
    const metadata = {
      contentType: "image/png",
    };

    const storageRef = ref(storage, `images/${value?.orderCode}`);
    const uploadTask = uploadBytesResumable(storageRef, img, metadata);
    console.log(URL.createObjectURL(img));
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Xử lý trường hợp tải ảnh thất bại
      },
      () => {
        // Xử lý trường hợp tải ảnh thành công
        //  Lấy về đường link của ảnh vừa tải thành công
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // reset các trạng thái sau khi tải ảnh thành công
          postImage({
            MESSTYPE: 12,
            OBJCTYPE: 0,
            OBJCCODE: "000005",

            MAILSBJC: "",
            MESSTEXT: "QR Code thanh toán hóa đơn " + value?.orderCode,

            LISTIMGE: "",

            LISTFILE: "",
            URL_IMGE: downloadURL,
            URL_FILE: "",

            DCMNCODE: "",
            KEY_CODE: "",

            MAINCODE: "",
            STTESIGN: 0,
            EMPLCODE: "",

            CNTNTYPE: 0,
            CNTNCODE: "",
            CNTN_ADD: "",
          });
        });
      }
    );
    toast.success("Chia sẻ thành công!", {
      autoClose: 1000,
    });
  };

  useEffect(() => {
    if (open == true) {
      const timeValue =
        value?.expiredAt - Math.floor(new Date().getTime() / 1000);
      let timeRemain =
        value?.expiredAt - Math.floor(new Date().getTime() / 1000);
      // console.log(timeRemain);
      let intervalTime = null;
      if (timeRemain >= 0 && open) {
        intervalTime = setInterval(() => {
          document.getElementById("timeTranfer").textContent =
            (Math.floor(timeRemain / 60) >= 10
              ? Math.floor(timeRemain / 60)
              : "0" + Math.floor(timeRemain / 60)) +
            ":" +
            (Math.floor(timeRemain % 60) >= 10
              ? Math.floor(timeRemain % 60)
              : "0" + Math.floor(timeRemain % 60));
          timeRemain -= 1;
          if (timeRemain == -1) {
            clearInterval(intervalTime);
            document.getElementById("timeTranfer").textContent =
              "Hết hạn thanh toán";
          }
        }, 1000);
      }

      if (!open) {
        for (var i = 1; i < 10000; i++) window.clearInterval(i);
      }
    }
  }, [open]);
  // console.log(open);
  return (
    <div
      className={`${
        open ? "opacity-100 z-50 visible" : "opacity-0 -z-20 invisibleS"
      } fixed h-screen w-screen top-0 right-0 flex items-center justify-center transition-opacityVisibility duration-200 ease-in-out`}
    >
      <div
        className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-15"
        onClick={handleClose}
      ></div>

      <div className="bg-white p-5 rounded-lg w-fit !z-50">
        <div className="justify-between flex">
          <div className="flex justify-start gap-x-6">
            <button
              className="text-gray-dark cursor-pointer text-sm"
              onClick={handlePrint}
            >
              <i class="ri-printer-line text-xl"></i> Print
            </button>
            <a
              download={value?.orderCode}
              className="text-gray-dark cursor-pointer text-sm"
              href={value?.qrDataURL}
            >
              <i class="ri-download-2-line text-xl"></i> Lưu ảnh
            </a>
            <button
              className="text-gray-dark cursor-pointer text-sm"
              onClick={shareImage}
            >
              <i class="ri-share-forward-line text-gray-dark"></i> Chia sẻ
            </button>
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <i class="ri-close-line text-gray-dark text-2xl"></i>
          </div>
        </div>
        <div
          ref={componentRef}
          className="flex flex-col items-center justify-center p-5 pb-0 mb-4"
        >
          {/* <input type="file" onChange={changeFile} /> */}
          <div className="shadow-lg border border-gray-300 mb-3 p-3 w-72">
            <img src={value?.qrDataURL} alt="" className="w-96 mb-5" />
          </div>
          <div className="w-full">
            <h5 className="text-amber-300 text-2xl font-semibold mb-5 text-center italic">
              Thông tin chuyển khoản
            </h5>
            <div className="flex gap-y-4 flex-col items-center">
              <div className="flex flex-col gap-y-2 items-start">
                <div className="text-gray-dark text-sm">
                  <span className="font-medium">Tên tài khoản:</span>{" "}
                  <span className="italic"> {value?.accountName} </span>
                  <button
                    onClick={() =>
                      copyClipboard(value?.accountName, "tên tài khoản")
                    }
                    className="print:hidden text-gray-dark text-lg"
                  >
                    <i class="ri-file-copy-line"></i>
                  </button>
                </div>
                <div className="text-gray-dark text-sm">
                  <span className="font-medium">Số tài khoản:</span>{" "}
                  <span className="italic">{value?.accountNumber} </span>
                  <button
                    onClick={() =>
                      copyClipboard(value?.accountNumber, "số tài khoản")
                    }
                    className="print:hidden text-gray-dark text-lg"
                  >
                    <i class="ri-file-copy-line"></i>
                  </button>
                </div>
                <div className="text-gray-dark text-sm">
                  <span className="font-medium">Số tiền:</span>{" "}
                  <span className="italic">
                    {" "}
                    {value?.amount?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="text-gray-dark text-sm">
                  <span className="font-medium">Nội dung chuyển khoản:</span>{" "}
                  <span className="italic"> {value?.description} </span>
                  <button
                    onClick={() =>
                      copyClipboard(value?.description, "nội dung")
                    }
                    className="print:hidden text-gray-dark text-lg"
                  >
                    <i class="ri-file-copy-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 px-5">
          <div className="flex">
            <span className="text-gray-dark font-medium text-sm">
              Thời gian thanh toán:
            </span>
            <div id="timeTranfer" className="ml-1 text-gray-dark text-sm"></div>
          </div>
        </div>
        <button
          onClick={handleTranfer}
          className="text-sm bg-second text-white px-3 py-2 rounded-md block ml-auto"
        >
          Đã chuyển khoản
        </button>
      </div>
    </div>
  );
};

export default VietQRComponent;
