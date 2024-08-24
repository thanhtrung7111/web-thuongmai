import React from "react";
import SpinnerLoading from "../commonAnimtaion/SpinnerLoading";

const ButtonForm = ({
  type = "button",
  label,
  labelLoading = "",
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      className="bg-second text-white disabled:bg-slate-400 py-3 w-full flex justify-center items-center px-3 hover:bg-opacity-90 transition-all duration-200"
      disabled={loading || disabled}
      type={type}
    >
      {loading ? <SpinnerLoading></SpinnerLoading> : label}
    </button>
  );
};

export default ButtonForm;
