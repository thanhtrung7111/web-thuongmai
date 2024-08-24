import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

const SelectForm = ({
  label,
  itemKey,
  itemValue,
  important = false,
  loading = false,
  options = [],
  disable = false,
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
    if (onChange) onChange(item);
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
  useEffect(() => {
    setSelected(options.length <= 0 ? "" : options[0]);
    setDataFilter(options);
    setShow(false);
    console.log("hello");
  }, [options[0][`${itemKey}`]]);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-600">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } ${
          disable && "bg-slate-50"
        } px-3 py-3 text-sm border outline-none rounded-sm w-full flex relative`}
      >
        {loading ? (
          <div className="flex-auto">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-slate-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <>
            <input
              onClick={() => setShow(!show)}
              onBlur={(e) => {
                if (e.target.value == "" && options.length >= 1) {
                  setSelected(options[0]);
                  helpers.setValue(options[0][`${itemKey}`]);
                  if (onChange) onChange(options[0]);
                }
                setShow(false);
              }}
              disabled={disable}
              onChange={(e) => filterChange(e)}
              value={selected && selected[`${itemValue}`]}
              autoComplete="off"
              className="flex-auto outline-none disabled:bg-transparent"
            />
            <input
              autoComplete="off"
              {...props}
              {...field}
              onChange={field.onChange}
              hidden
            />
          </>
        )}
        <i class="ri-arrow-down-s-line"></i>
        <div
          className={`${
            show == true ? "visible opacity-100" : "opacity-0 invisible"
          } absolute w-full  z-50 top-[90%] right-0 h-60 overflow-y-scroll bg-white rounded-md border border-gray-300 transition-all duration-150`}
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
