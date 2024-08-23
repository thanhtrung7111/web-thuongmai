import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

const SelectForm = ({
  label,
  itemKey,
  itemValue,
  important = false,
  loading = false,
  options = [],
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [dataFilter, setDataFilter] = useState(options);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const handleSelectItem = (item) => {
    setSelected(item);
    helpers.setValue(item[`${itemKey}`]);
    onChange(item[`${itemKey}`]);
    setShow(false);
  };

  const filterChange = (e) => {
    setSelected({ ...selected, [itemValue]: e.target.value });
    setDataFilter(
      options.filter(
        (item) =>
          item[itemValue].toLowerCase().indexOf(e.target.value.toLowerCase()) >=
          0
      )
    );
  };
  return loading ? (
    "Đang tải"
  ) : (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-600">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 py-3 text-sm border outline-none rounded-sm w-full flex relative`}
      >
        <input
          onClick={() => setShow(!show)}
          onBlur={(e) => {
            if (e.target.value == "") {
              setSelected(options[1]);
              helpers.setValue(options[1][`${itemKey}`]);
            }
            setShow(false);
          }}
          onChange={(e) => filterChange(e)}
          value={selected[`${itemValue}`]}
          autoComplete="off"
          className="flex-auto outline-none"
        />
        <input
          autoComplete="off"
          {...props}
          {...field}
          onChange={field.onChange}
          className="flex-auto outline-none"
          hidden
        />
        <div></div>
        <i class="ri-arrow-down-s-line"></i>
        <div
          className={`${
            show == true ? "visible opacity-100" : "opacity-0 invisible"
          } absolute w-full top-[90%] right-0 h-60 overflow-y-scroll bg-white rounded-md border border-gray-200 transition-all duration-150`}
        >
          {dataFilter.length <= 0 ? (
            <div className="text-sm px-2 py-2">
              Không có mục bạn tìm kiếm...
            </div>
          ) : (
            dataFilter.map((item) => {
              return (
                <div
                  onClick={() => handleSelectItem(item)}
                  className={`px-2 py-1 cursor-pointer hover:bg-slate-100 ${
                    selected[`${itemKey}`] == item[`${itemKey}`]
                      ? "bg-slate-100"
                      : "bg-white"
                  }`}
                >
                  {item[`${itemValue}`]}
                </div>
              );
            })
          )}
        </div>
      </div>
      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default SelectForm;
