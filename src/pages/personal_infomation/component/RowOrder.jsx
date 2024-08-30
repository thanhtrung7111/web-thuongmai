import React, { useEffect, useState } from "react";
import moment from "moment";
const RowOrder = ({
  item,
  status,
  onClickDetail,
  order,
  id,
  maincode,
  date,
  products,
  productID,
  productName,
  productImg,
  productCategory,
  productQuantity,
  productPrice,
}) => {
  const [detailOrder, setDetailOrder] = useState(null);
  const [elementStatus, setElementStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    switch (status) {
      case "cancel":
        setElementStatus(
          <div className="absolute top-0 right-0 text-sm bg-red-400 text-white px-3 py-1">
            Đã hủy
          </div>
        );
        break;
      case "complete":
        setElementStatus(
          <div className="absolute top-0 right-0 text-sm bg-green-400 text-white px-3 py-1">
            Hoàn thành
          </div>
        );
        break;
      case "confirm":
        setElementStatus(
          <div className="absolute top-0 right-0 text-sm bg-gray-light text-white px-3 py-1">
            Chờ xác nhận
          </div>
        );
        break;
      case "delivering":
        setElementStatus(
          <div className="absolute top-0 right-0 text-sm bg-orange-300 text-white px-3 py-1">
            Đang giao
          </div>
        );
        break;
      default:
        setElementStatus(null);
    }
  }, [status]);

  // useEffect(() => {
  //   async function fetchDetail() {
  //     const body = {
  //       DCMNCODE: "DDHKH",
  //       KEY_CODE: id,
  //     };
  //     await fetchDataDetail(body)
  //       .then((res) => {
  //         setDetailOrder(res?.data?.RETNDATA[0]);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  //   fetchDetail();
  // }, [id, maincode]);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [detailOrder != null]);
  // console.log(detailOrder);
  console.log(item);
  return (
    <div
      className={`relative 
       border rounded-lg overflow-hidden`}
    >
      {elementStatus}
      <div className="flex items-center gap-x-2 bg-slate-100 p-2">
        <h5 className="text-gray-dark text-xl font-light">
          <span className="font-medium">Đơn hàng:</span> #{item[maincode]}
        </h5>
        <span className="text-xs text-gray-light italic">
          ( {moment(item[date]).format("DD/MM/yyyy")} )
        </span>

        <div
          className="text-sm text-gray-dark hover:text-second cursor-pointer pl-2 border-l border-gray-300"
          onClick={() => onClickDetail(item[id])}
        >
          <i class="ri-error-warning-line"></i> Chi tiết
        </div>
      </div>
      {/* <div>
        {detailOrder?.DETAIL?.map((item) => {
          return (
            <div className="flex gap-x-2 px-2 py-2 border-gray-100">
              <div className="border p-2 w-fit bg-white rounded-sm">
                <img
                  src={Asus}
                  alt=""
                  className="size-14 object-contain object-center"
                />
              </div>
              <div className="flex justify-between flex-auto">
                <div>
                  <h5 className="text-gray-darked font-normal text-base">
                    {item["PRDCNAME"]}
                  </h5>
                  <p className="text-sm text-gray-dark">
                    Loại hàng: <span>{item[productCategory]}</span>
                  </p>
                  <span className="text-gray-dark text-sm">
                    x{item["PRDCQTTY"]}
                  </span>
                </div>
                <div className="block text-lg text-second font-light">
                  {5000?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
      {/* <div className="p-3 flex items-end justify-between">
        <div></div>
        <div>
          <div>
            <div className="w-72 text-end text-second text-xl font-light border-b border-gray-100 py-2 flex items-center justify-between pl-2">
              <span className="text-gray-dark flex items-center gap-x-1">
                <i class="ri-money-dollar-circle-line"></i> Thành tiền:
              </span>

              {detailOrder?.SUM_AMNT?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          <div className="flex items-center py-2 gap-x-2">
            <button className="px-2 py-1 text-white bg-second text-sm hover:bg-opacity-90">
              Mua lại
            </button>
            <button className="px-2 py-1 text-white bg-second text-sm hover:bg-opacity-90">
              Đánh giá sản phẩm
            </button>
            <button className="px-2 py-1 text-gray-dark border text-sm hover:opacity-85">
              Liên hệ
            </button>
          </div>
        </div>
      </div>
      <div className="text-xs gap-x-1 text-red-600 block text-center mb-4">
        <i class="ri-question-line"></i>
        <span>
          Sản phẩm hư hỏng hoặc không đúng mô tả xin vui lòng liên hệ với cửa
          hàng!
        </span>
      </div> */}
    </div>
  );
};

export default RowOrder;
