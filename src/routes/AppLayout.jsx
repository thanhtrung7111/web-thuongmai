import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "@components/menu/Menu";

const AppLayout = () => {
  return (
    <div>
      <Menu></Menu>
      <div className="py-3 bg-gray-50">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AppLayout;
