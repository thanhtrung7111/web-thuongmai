import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { closeAppNotify } from "../../redux/reducer/popupReducer";
import { logout } from "../../redux/reducer/userReducer";

const AppNotifycation = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAppNotify } = useSelector((state) => state.popup);
  const handleClose = () => {
    dispatch(closeAppNotify());
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };
  return (
    <div
      className={`${
        showAppNotify?.open ? "visible" : "invisible"
      } fixed w-full h-full  bg-black bg-opacity-50 z-50 pt-10 flex justify-center`}
      onClick={handleClose}
    >
      <div
        className={`${
          showAppNotify?.open ? "translate-y-0" : "-translate-y-[130%]"
        } bg-white  h-fit w-60 flex flex-col justify-center rounded-lg overflow-hidden transition-transform duration-300`}
      >
        <h5 className="py-1 font-semibold text-lg bg-first text-white w-full text-center">
          Thông báo
        </h5>
        <div className="p-3 flex flex-col items-center">
          <p className="text-sm text-gray-dark mb-5">Bạn hết phiên đăng nhập</p>
          {/* {showAppNotify?.link && (
              <NavLink
                to={`/${showAppNotify?.link}`}
                className="bg-second text-white text-sm px-2 py-2"
              >
                Đăng nhập lại
              </NavLink>
            )} */}
          <NavLink
            to={"/login"}
            className="bg-second text-white text-sm px-2 py-1"
          >
            Đăng nhập
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AppNotifycation;
