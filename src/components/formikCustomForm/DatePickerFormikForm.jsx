import { useField } from "formik";
import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
const DatePickerFormikForm = ({
  label,
  important = false,
  disabled = false,
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      {label && (
        <label htmlFor="">
          <span className="text-gray-600">{label} </span>{" "}
          {important && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* <Datepicker
        {...props}
        {...field}
        selected={field.value}
        onChange={(date) => helpers.setValue(date)}
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 py-3 text-sm disabled:bg-slate-50 border outline-none rounded-sm w-full`}
      ></Datepicker> */}

      <Datepicker
        useRange={false}
        disabled={disabled}
        asSingle={true}
        i18n="vn"
        containerClassName="relative"
        inputClassName={`Datepicker ${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 py-3 text-sm disabled:bg-slate-50 border outline-none rounded-sm w-full`}
        toggleClassName="absolute bg-slate-400 text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        displayFormat={"DD/MM/YYYY"}
        value={field.value}
        onChange={(newValue) => helpers.setValue(newValue)}
        {...props}
      ></Datepicker>

      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default DatePickerFormikForm;
