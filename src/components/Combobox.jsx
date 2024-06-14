import { useField } from "formik";
import React from "react";

const Combobox = ({
  data,
  itemKey,
  itemName,
  title,
  disabled = false,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div
      className={`flex flex-col gap-y-1 ${className} ${
        disabled ? "opacity-95" : "opacity-100"
      }`}
    >
      <label className="text-gray-dark text-sm">{title}</label>
      <div className="relative w-full">
        <select
          {...props}
          {...field}
          disabled={disabled}
          className={`outline-second  ${
            meta.error ? "border border-red-600" : "border"
          }  rounded-sm py-1 px-2 text-sm text-gray-dark appearance-none w-full`}
        >
          {data?.length > 0 &&
            data?.map((item) => {
              return (
                <option
                  key={item[itemKey]}
                  value={item[itemKey]}
                  selected={field.value == item[itemKey]}
                >
                  {item[itemName]}
                </option>
              );
            })}
        </select>
        <i class="ri-arrow-down-s-fill absolute top-1 right-2 text-gray-dark"></i>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Combobox;
