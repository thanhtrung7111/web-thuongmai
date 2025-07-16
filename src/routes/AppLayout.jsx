import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/menu/Menu";
import ProductCatalog from "../components/menu/ProductCatalog";
import { useDispatch, useSelector } from "react-redux";
import { closeCatalog } from "../redux/reducer/popupReducer";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { catalog } = useSelector((state) => state.popup);
  return (
    <div className="h-full">
      <Menu></Menu>{" "}
      <div className="py-3 bg-[#ffffff] relative">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AppLayout;
