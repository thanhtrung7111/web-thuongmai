import React from "react";
import { useField } from "formik";

const InputForm = ({
  label,
  important = false,
  disabled = false,
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-600">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        {...field}
        autoComplete="off"
        onChange={(e) => {
          helpers.setValue(e.target.value);
          if (onChange) onChange(e);
        }}
        disabled={disabled}
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 py-3 text-sm disabled:bg-slate-50 border outline-none rounded-sm w-full`}
      />
      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default InputForm;
