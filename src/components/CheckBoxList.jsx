import React, { useEffect, useState } from "react";

const CheckBoxList = ({
  title,
  data,
  itemKey,
  itemName,
  onChange,
  onRefresh,
}) => {
  const [dataList, setDataList] = useState([]);
  const [amount, setAmount] = useState(10);
  const [extend, setExtend] = useState(true);
  const [valueChange, setValueChange] = useState([]);
  useEffect(() => {
    setDataList(data?.slice(0, amount));
  }, [amount, data]);

  useEffect(() => {
    const elementInput = document.querySelectorAll("input[type=checkbox]");
    elementInput.forEach((item) => {
      item.checked = false;
    });
  }, [onRefresh]);
  return (
    <div className="pb-3 border-b">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-gray-dark font-medium">{title}</h5>
        <div
          className={`hover:text-second transform transition duration-500 ease-in-out cursor-pointer ${
            !extend && "rotate-180"
          }`}
          onClick={() => setExtend(!extend)}
        >
          <i className={`ri-arrow-down-s-line`}></i>
        </div>
      </div>
      <ul
        className={`h-0 pl-3 flex flex-col gap-y-2 ${
          extend && "h-48 overflow-y-scroll"
        } overflow-hidden transition-[height]`}
      >
        {dataList?.map(
          (item) =>
            item[itemName] !== "" && (
              <li className="text-sm text-gray-dark flex gap-x-2">
                <input
                  type="checkbox"
                  className="accent-first checked:text-white"
                  onChange={() => onChange(item)}
                />
                <span>{item[itemName]}</span>
              </li>
            )
        )}
        {amount < data?.length && (
          <span
            className="text-second text-xs cursor-pointer"
            onClick={() => setAmount(amount + 5)}
          >
            Xem thêm...
          </span>
        )}
      </ul>
    </div>
  );
};

export default CheckBoxList;
