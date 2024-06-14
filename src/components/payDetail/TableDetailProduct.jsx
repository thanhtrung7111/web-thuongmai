import React from "react";
import ImageFetch from "../ImageFetch";
import RowPayDetail from "./RowPayDetail";

const TableDetailProduct = ({
  data,
  name,
  id,
  image,
  price,
  choose,
  total,
  quantity,
  saleoff,
  maincode,
  handleClickAll,
  handlePlus,
  handleBlurAmount,
  handleChangeAmount,
  handleDelete,
  handleChoose,
  chooseAll,
}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
      <thead class="text-xs text-gray-600 z-20 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 right-0 ">
        <th class="px-6 py-3 uppercase">
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              id="chooseAll"
              className="w-5 h-5 accent-first border-gray-light"
              onClick={handleClickAll}
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
                  handleBlurAmount={handleBlurAmount}
                  handleChangeAmount={handleChangeAmount}
                  handlePlus={handlePlus}
                  handleDelete={handleDelete}
                  handleChoose={handleChoose}
                  id={id}
                  item={i}
                  choose={choose}
                  price={price}
                  maincode={maincode}
                  name={name}
                  image={image}
                  saleoff={saleoff}
                  quantity={quantity}
                ></RowPayDetail>
              );
            })
          : "Bạn chưa có sản phẩm nào trong giỏ hàng"}
      </tbody>
    </table>
  );
};

export default TableDetailProduct;
