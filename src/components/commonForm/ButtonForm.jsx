import React from "react";
import SpinnerLoading from "../commonAnimtaion/SpinnerLoading";

const ButtonForm = ({
  type = "button",
  label,
  labelLoading = "",
  loading = false,
  disabled = false,
  className = "",
  icon = null,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-second gap-x-2 text-white disabled:bg-slate-400 h-10 text-sm w-full flex justify-center rounded-md items-center px-3 hover:bg-opacity-90 transition-all duration-200 ${className}`}
      disabled={loading || disabled}
      type={type}
    >
      {icon && icon}
      {loading ? <SpinnerLoading></SpinnerLoading> : label}
    </button>
  );
};

export default ButtonForm;
