import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, openPopup } from "../../redux/reducer/popupReducer";

const PopupCommon = ({
  children,
  title,
  width = "800px",
  height,
  open,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { popup } = useSelector((state) => state.popup);

  useEffect(() => {
    if (open) {
      dispatch(openPopup());
    } else {
      dispatch(closePopup());
    }
  }, [open]);
  return (
    <div
      className={`${
        open ? "visible" : "invisible"
      } fixed top-0 right-0 w-screen h-screen z-50 flex justify-center delay-100`}
    >
      <div
        className="bg-black opacity-20 w-full h-full absolute"
        onClick={onClose}
      ></div>
      <div
        className={`w-[${width}] bg-white rounded-md shadow-sm z-50 mt-10 -translate-y-[120%] ${
          open && "!translate-y-0"
        } transition-transform duration-300 h-fit overflow-hidden`}
      >
        <div className="bg-first text-white flex items-center justify-between py-2 px-5 border-b border-gray-100">
          <h5 className="text-base font-medium">{title}</h5>
          <div className="cursor-pointer" onClick={onClose}>
            <i class="ri-close-fill text-xl"></i>
          </div>
        </div>
        <div className={`p-5 min-h-36 max-h-[${height}] overflow-y-scroll`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupCommon;
