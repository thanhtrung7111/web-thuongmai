import React, { useEffect, useState } from "react";
import ImageFetch from "../ImageFetch";
import RowPayDetail from "./RowPayDetail";
import { useDispatch, useSelector } from "react-redux";
import { chooseAllProduct } from "../../redux/reducer/cartReducer";

const TableDetailProduct = ({ data, onHandleCheckAll, onHandleChooseItem }) => {
  const dispatch = useDispatch();
  const [chooseAll, setChooseAll] = useState(
    data?.find((item) => item.checked == false) ? false : true
  );
 
  useEffect(() => {
    const findItem = data?.find((item) => item.checked == false);
    console.log(data);
    console.log(findItem);
    if (findItem) {
      setChooseAll(false);
    } else {
      setChooseAll(true);
    }
  }, [data]);
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
      <thead class="text-xs text-gray-600 z-10 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 right-0 ">
        <th class="px-6 py-3 uppercase">
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              id="chooseAll"
              className="w-5 h-5 accent-first border-gray-light"
              onClick={(e) => {
                onHandleCheckAll(e.target.checked);
                setChooseAll(e.target.checked);
              }}
              checked={chooseAll}
            />{" "}
            <label for="chooseAll" className="cursor-pointer">
              Tất cả
            </label>
          </div>
        </th>

        <th class="px-6 py-3 uppercase">Số lượng</th>
        <th class="px-6 py-3 uppercase">Đơn giá</th>
        <th class="px-6 py-3 uppercase">Phần trăm giảm</th>
        <th class="px-6 py-3 uppercase">Thành tiền</th>
        <th class="px-6 py-3 w-32 uppercase">Xóa tất cả</th>
      </thead>
      <tbody>
        {data?.length >= 1
          ? data?.map((i) => {
              return (
                <RowPayDetail
                  handleChoose={onHandleChooseItem}
                  key={i["PRDCCODE"]}
                  item={i}
                  maincode={"KKKK0000"}
                  name={"PRDCNAME"}
                  id={"PRDCCODE"}
                  image={"PRDCIMAGE"}
                  saleoff={"DSCNRATE"}
                  price={"SALEPRCE"}
                  quantity={"QUOMQTTY"}
                  choose={"checked"}
                ></RowPayDetail>
              );
            })
          : "Bạn chưa có sản phẩm nào trong giỏ hàng"}
      </tbody>
    </table>
  );
};

export default TableDetailProduct;
