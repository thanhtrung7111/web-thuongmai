import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "@components/menu/Menu";

const AppLayout = () => {
  return (
    <div className="h-full">
      <Menu></Menu>
      <div className="py-3 bg-[#ffffff]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AppLayout;
