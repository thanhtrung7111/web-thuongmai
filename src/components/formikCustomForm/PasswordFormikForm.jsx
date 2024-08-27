import { useField } from "formik";
import React, { useState } from "react";

const PasswordFormikForm = ({ label, important = false, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-600">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 py-3 text-sm border outline-none rounded-sm w-full flex`}
      >
        <input
          {...props}
          {...field}
          autoComplete="off"
          type={show ? "text" : "password"}
          className="outline-none flex-auto"
        />

        <div
          className="cursor-pointer w-8 text-end"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <i class="ri-eye-line"></i>
          ) : (
            <i class="ri-eye-close-line"></i>
          )}
        </div>
      </div>
      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default PasswordFormikForm;
