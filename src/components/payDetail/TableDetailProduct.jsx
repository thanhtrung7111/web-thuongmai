import React from "react";

const TableDetailProduct = ({ data, handleClickAll }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
        <th class="px-6 py-3 uppercase">
          <input
            type="checkbox"
            className="accent-first border-gray-light"
            onClick={handleClickAll}
            value={chooseAll}
          />{" "}
          Tất cả
        </th>

        <th class="px-6 py-3 uppercase">Số lượng</th>
        <th class="px-6 py-3 uppercase">Đơn giá</th>
        <th class="px-6 py-3 uppercase">Thành tiền</th>
        <th class="px-6 py-3 w-fit uppercase">Xóa tất cả</th>
      </thead>

      <tbody>
        {data?.length >= 1
          ? data.map((item) => {
              // const [imageState, setImageState] = useState(null);
              // async function fetchImage() {
              //   await fetch(item["PRDCIMGE"], {
              //     method: "GET",
              //     headers: {
              //       TOKEN: localStorage.getItem("tokenUser"),
              //     },
              //   })
              //     .then((response) => {
              //       // console.log(response);
              //       return response.blob();
              //     })
              //     .then((blob) => {
              //       setImageState(URL.createObjectURL(blob));
              //     });
              // }
              // fetchImage();
              // console.log(imageState);
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex items-center gap-x-2 w-fit">
                      <input
                        type="checkbox"
                        className="accent-first border-gray-light"
                        checked={item.choose}
                        onClick={() => handleChangeChoose(item["PRDCCODE"])}
                      />
                      <img
                        src={fetch(item["PRDCIMGE"], {
                          method: "GET",
                          headers: {
                            TOKEN: localStorage.getItem("tokenUser"),
                          },
                        })
                          .then((response) => {
                            // console.log(response);
                            return response.blob();
                          })
                          .then((blob) => {
                            console.log(URL.createObjectURL(blob));
                            return URL.createObjectURL(blob);
                          })}
                        alt=""
                        className="w-20 h-16 object-cover object-center border p-[1px]"
                      />
                      <span className="text-gray-dark text-wrap lg:w-60 line-clamp-2 w-0">
                        {item["PRDCNAME"]}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="flex items-center w-fit gap-x-1">
                      <button
                        onClick={() => handleSubstract(item["PRDCCODE"])}
                        className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark"
                      >
                        -
                      </button>
                      <div className="border rounded-md w-6 h-6 flex items-center justify-center text-xs text-gray-dark">
                        {item["quantity"]}
                      </div>
                      <button
                        onClick={() => handlePlus(item["PRDCCODE"])}
                        className="border rounded-md w-6 h-6 flex items-center justify-center text-gray-dark"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="font-semibold">
                      {item["PRCEDSCN"]} <span className="text-xs">đ</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="font-semibold">
                      {item["PRCEDSCN"] * item["quantity"]}{" "}
                      <span className="text-xs">đ</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div
                      className="text-white bg-red-500 w-fit px-2 py-1 rounded-md text-xs cursor-pointer"
                      onClick={() => handleDeleteProduct(item["PRDCCODE"])}
                    >
                      Xóa
                    </div>
                  </td>
                </tr>
              );
            })
          : "Bạn chưa có sản phẩm nào trong giỏ hàng"}
      </tbody>
    </table>
  );
};

export default TableDetailProduct;
