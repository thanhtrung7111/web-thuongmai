import { useField } from "formik";
import React, { useEffect, useState } from "react";

const NumberFormikForm = ({
  label,
  important = false,
  disabled = false,
  onChange,
  unit = "",
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (value == "") {
      helpers.setValue(0);
      return;
    }
    helpers.setValue(Number.parseFloat(value.replace(/,/g, "")));
  }, [value]);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-600">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 ${
          disabled && "bg-slate-100"
        } py-3 flex items-center text-sm  border outline-none rounded-sm w-full`}
      >
        <input
          {...props}
          type="text"
          disabled={disabled}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue == "") {
              setValue("");
              return;
            }
            if (inputValue.match(/^\d*(,?\d*)*\d$/)) {
              const inputValueConvert = parseInt(inputValue.replace(/,/g, ""));
              const formattedValue = inputValueConvert
                ? inputValueConvert.toLocaleString()
                : "";
              console.log(inputValue);
              setValue(formattedValue);
            } else {
            }
          }}
          value={value}
          className="outline-none flex-auto bg-transparentF"
        />
        <div className="flex gap-x-1 items-center">
          {unit != "" && <span className="text-gray-400">{unit}</span>}
          <i class="ri-expand-up-down-line"></i>
        </div>
      </div>
      <input
        {...props}
        {...field}
        hidden
        autoComplete="off"
        // onChange={(e) => {
        //   helpers.setValue(e.target.value);
        // }}
        disabled={disabled}
      />
      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default NumberFormikForm;
