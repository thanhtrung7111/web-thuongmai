import { useField } from "formik";
import React from "react";

const TextArea = ({
  title,
  className,
  rows = 5,
  cols = 10,
  disabled = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      <label className="text-gray-dark text-sm">{title}</label>
      <div className="relative w-full">
        <textarea
          disabled={disabled}
          cols={cols}
          rows={rows}
          {...props}
          {...field}
          className="outline-second border rounded-sm py-1 px-2 text-sm text-gray-dark appearance-none w-full"
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
