import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "@assets/img/Icon.png";
const AppLogin = () => {
  return (
    <>
      <div className="header shadow-lg sticky top-0 right-0 z-50 bg-white">
        <div className="xl:container xl:mx-auto mx-5 flex items-center justify-between">
          <div className="w-40">
            <img src={Logo} alt="" className="w-full" />
          </div>

          <div className="flex items-center text-first">
            <i class="ri-customer-service-2-fill text-xl"></i>
            Tư vấn doanh nghiệp
          </div>
        </div>
      </div>
      <div className="bg-[#f8f8f8] py-20">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default AppLogin;
