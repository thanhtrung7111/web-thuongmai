import React, { useEffect, useState } from "react";
import RowOrder from "./RowOrder";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getOrderDetail,
} from "../../../redux/actions/orderActions";
import InfomationOrderSkeleton from "./InfomationOrderSkeleton";
import Panigation from "../../../components/panigation/Panigation";
import TabComponent from "../../../components/TabComponent";
const menu = [
  { tabId: 1, nameTab: "Tất cả" },
  { tabId: 2, nameTab: "Chờ xác nhận" },
  { tabId: 3, nameTab: "Đang giao" },
  { tabId: 4, nameTab: "Đã thanh toán" },
  { tabId: 5, nameTab: "Đã hủy" },
];

const dataDemo = [
  {
    orderID: "#5559999",
    date: "2024-02-15",
    status: "cancel",
    products: [
      {
        productID: "5557788",
        productName: "Máy tính asus 2080",
        category: "RAM 32GB",
        quantity: "9",
        productPrice: 8000000,
      },
      {
        productID: "5557788",
        productName: "Máy tính asus 2080",
        category: "RAM 64GB",
        quantity: "7",
        productPrice: 8000000,
      },
    ],
  },
  {
    orderID: "#53359999",
    date: "2024-02-15",
    status: "complete",
    products: [
      {
        productID: "5557788",
        productName: "Máy tính asus 2080",
        category: "RAM 64GB",
        quantity: "2",
        productPrice: 8000000,
      },
      {
        productID: "5557788",
        productName: "Máy tính asus 2080",
        category: "RAM 64GB",
        quantity: "2",
        productPrice: 8000000,
      },
    ],
  },
];
const pageSize = 5;
const InfomationOrder = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState();
  const [tabIndex, setTabIndex] = useState(menu[0]);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(tabIndex);
  const { listOrder } = useSelector((state) => state.order);
  const onClickDetail = (id) => {
    dispatch(
      getOrderDetail({
        DCMNCODE: "DDHKH",
        KEY_CODE: id,
      })
    );

    dispatch(openDetailOrder());
  };

  useEffect(() => {
    dispatch(
      getAllOrder({
        DCMNCODE: "DDHKH",
        STTESIGN: 7,
        BEG_DATE: "2024-01-01",
        END_DATE: "2024-12-31",
        ADD_COND: "CustCode = " + "'" + currentUser?.CUSTCODE + "'",
      })
    );
  }, []);

  const handleSearchOrder = (e) => {
    setSearch(e.target.value);
  };

  return listOrder?.isLoading ? (
    <InfomationOrderSkeleton />
  ) : (
    <>
      <div>
        <div className="mb-4 flex justify-between items-center">
          <h5
            className="text-gray-dark font-medium text-xl"
            id="infomation_order"
          >
            Thông tin đơn hàng
          </h5>
          <div className="px-2 py-1 border flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng"
              className="text-sm outline-none text-gray-dark"
              onChange={(e) => handleSearchOrder(e)}
              value={search}
            />
            <i class="ri-search-line text-gray-dark"></i>
          </div>
        </div>
        <div className="mb-2">
          <TabComponent
            id="tabId"
            name="nameTab"
            data={menu}
            currentIndex={tabIndex}
            onChange={(item) => setTabIndex(item)}
          ></TabComponent>
        </div>
        <div className="min-h-96 gap-y-2 flex flex-col mb-5">
          {listOrder.data
            ?.slice(
              (currentPage - 1) * pageSize,
              (currentPage - 1) * pageSize + pageSize
            )
            ?.map((item) => {
              return (
                <RowOrder
                  item={item}
                  key={item["KKKK0000"]}
                  id={"KKKK0000"}
                  maincode={"MAINCODE"}
                  date={"MAINDATE"}
                  status={"complete"}
                  onClickDetail={onClickDetail}
                ></RowOrder>
              );
            })}
        </div>
        <Panigation
          currentPage={currentPage}
          totalCount={listOrder.data?.length > 0 ? listOrder.data?.length : 0}
          pageSize={pageSize}
          scrollTo="infomation_order"
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        ></Panigation>
      </div>
    </>
  );
};

export default InfomationOrder;
