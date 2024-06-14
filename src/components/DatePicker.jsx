import { useField } from "formik";
import React from "react";

const DatePicker = ({ title, className, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      <label className="text-gray-dark text-sm">{title}</label>
      <div className="relative w-full">
        <input
          type="date"
          {...props}
          {...field}
          className={`outline-second ${
            meta.error ? "border border-red-600" : "border"
          }  rounded-sm py-1 px-2 text-sm text-gray-dark appearance-none w-full`}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DatePicker;
