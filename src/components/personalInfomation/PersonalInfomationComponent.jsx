import React, { useEffect, useState } from "react";
import Information from "./Information";
import Wrapper from "../Wrapper";
import { NavLink } from "react-router-dom";
import InfomationOrder from "./InfomationOrder";
import InfomationNotify from "./InfomationNotify";
import NoAvatar from "../../assets/img/noavatar.png";
const PersonalInfomationComponent = ({ tab }) => {
  const [element, setElement] = useState(null);
  useEffect(() => {
    if (tab == "info") {
      setElement(<Information></Information>);
    } else if (tab == "order") {
      setElement(<InfomationOrder></InfomationOrder>);
    } else if (tab == "notify") {
      setElement(<InfomationNotify></InfomationNotify>);
    }
  }, [tab]);
  return (
    <div className="xl:container xl:mx-auto mx-5">
      <div className="grid grid-cols-[1fr_3fr] gap-2">
        {/* Thông tin cơ bản  */}
        <Wrapper>
          <div className="flex flex-col py-5">
            <div className="mx-4 flex gap-x-5 mb-3 border-b pb-5">
              <img
                src={NoAvatar}
                className="size-20 rounded-full object-cover object-center self-center"
                alt=""
              />

              <div className="flex flex-col gap-y-2">
                <p className="text-sm  text-gray-dark">
                  <span className="font-semibold">Họ và tên:</span> Thành trung
                </p>
                <p className="text-sm  text-gray-dark">
                  <span className="font-semibold">Email:</span>{" "}
                  thanhtrung71119999@gmail.com
                </p>
                <p className="text-sm  text-gray-dark">
                  <span className="font-semibold">Số điện thoại:</span>{" "}
                  0909188753
                </p>
              </div>
            </div>

            <div className="px-4">
              <NavLink
                to={"/personal?tab=info"}
                className="py-2 text-gray-dark flex gap-x-1 items-center hover:text-second cursor-pointer hover:translate-x-2 transition-transform"
              >
                <i class="ri-user-line"></i>
                <h4 className="text-sm">Thông tin tài khoản</h4>
              </NavLink>
              <NavLink
                to={"/personal?tab=order"}
                className="py-2 text-gray-dark flex gap-x-1 items-center hover:text-second cursor-pointer hover:translate-x-2 transition-transform"
              >
                <i class="ri-survey-line"></i>{" "}
                <h4 className="text-sm">Đơn hàng</h4>
              </NavLink>
              <NavLink
                to={"/personal?tab=notify"}
                className="py-2 text-gray-dark flex gap-x-1 items-center hover:text-second cursor-pointer hover:translate-x-2 transition-transform"
              >
                <i class="ri-notification-line"></i>
                <h4 className="text-sm">Thông báo</h4>
              </NavLink>
              <NavLink className="py-2 text-gray-dark flex gap-x-1 items-center hover:text-second cursor-pointer hover:translate-x-2 transition-transform">
                <i class="ri-bank-fill"></i>
                <h4 className="text-sm">Liên kết ngân hàng</h4>
              </NavLink>
              <NavLink className="py-2 text-gray-dark flex gap-x-1 items-center hover:text-second cursor-pointer hover:translate-x-2 transition-transform">
                <i class="ri-logout-box-line"></i>
                <h4 className="text-sm">Đăng xuất</h4>
              </NavLink>
            </div>
          </div>
        </Wrapper>

        <Wrapper>
          <div className="p-5 h-full">{element}</div>
        </Wrapper>
      </div>
    </div>
  );
};

export default PersonalInfomationComponent;
