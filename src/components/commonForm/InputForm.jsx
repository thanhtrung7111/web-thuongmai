import React from "react";
import { useField } from "formik";

const InputForm = ({
  label,
  important = false,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-600">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>
      <input
        autoComplete="off"
        onChange={(e) => {
          if (onChange) onChange(e);
        }}
        disabled={disabled}
        className={`border-gray-200
         px-3 py-3 text-sm disabled:bg-slate-50 border outline-none rounded-sm w-full`}
      />
    </div>
  );
};

export default InputForm;
