import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { closeCatalog } from "../../redux/reducer/popupReducer";

const menu = [
  {
    title: "Lap top",
    icon: <i className="ri-macbook-line"></i>,
    link: "/products",
    child: [
      {
        title: "Thương hiệu",
        child: [
          { title: "ASUS", link: "/products" },
          { title: "MSI", link: "/products" },
          { title: "LENOVO", link: "/products" },
          { title: "DELL", link: "/products" },
          { title: "HP", link: "/products" },
          { title: "LG", link: "/products" },
        ],
      },
      {
        title: "Giá bán",
        child: [
          { title: "Dưới 15 triệu", link: "/products" },
          { title: "Từ 15 đến 20 triệu", link: "/products" },
          { title: "Trên 20 triệu", link: "/products" },
        ],
      },
      {
        title: "CPU",
        child: [
          { title: "Intel Core i3", link: "/products" },
          { title: "Intel Core i5", link: "/products" },
          { title: "Intel Core i7", link: "/products" },
          { title: "AMD Ryzen", link: "/products" },
        ],
      },
      {
        title: "Nhu cầu sử dụng",
        child: [
          { title: "Đồ họa", link: "/products" },
          { title: "Gamming", link: "/products" },
          { title: "Văn phòng", link: "/products" },
        ],
      },
    ],
  },
  {
    title: "Màn hình",
    icon: <i className="ri-tv-2-line"></i>,
    link: "/products",
    child: [
      {
        title: "Thương hiệu",
        child: [
          { title: "ASUS", link: "/products" },
          { title: "MSI", link: "/products" },
          { title: "LENOVO", link: "/products" },
          { title: "DELL", link: "/products" },
          { title: "HP", link: "/products" },
          { title: "LG", link: "/products" },
        ],
      },
      {
        title: "Giá bán",
        child: [
          { title: "Dưới 15 triệu", link: "/products" },
          { title: "Từ 15 đến 20 triệu", link: "/products" },
          { title: "Trên 20 triệu", link: "/products" },
        ],
      },
      {
        title: "CPU",
        child: [
          { title: "Intel Core i3", link: "/products" },
          { title: "Intel Core i5", link: "/products" },
          { title: "Intel Core i7", link: "/products" },
          { title: "AMD Ryzen", link: "/products" },
        ],
      },
      {
        title: "Nhu cầu sử dụng",
        child: [
          { title: "Đồ họa", link: "/products" },
          { title: "Gamming", link: "/products" },
          { title: "Văn phòng", link: "/products" },
        ],
      },
    ],
  },
  {
    title: "Sản phẩm",
    link: "/products",
    icon: <i className="ri-instance-line"></i>,
    child: [],
  },
];

const ProductCatalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="border border-slate-400 w-full rounded-md h-full relative bg-gray-100 min-h-[500px]">
      {menu.map((item) => {
        return (
          <div className="menuParent">
            <div
              onClick={() => {
                dispatch(closeCatalog());
                navigate("/products");
              }}
              className="flex items-center text-slate-700 h-8 border-slate-400 hover:text-white hover:bg-second rounded-md transition-colors justify-between cursor-pointer px-3 py-1"
            >
              <div className="flex items-center gap-x-2  text-xs">
                {item.icon}
                <span className="font-medium text-sm">{item.title}</span>
              </div>
              {item.child.length > 0 && (
                <i className="ri-arrow-right-s-line"></i>
              )}
            </div>
            {item.child.length > 0 && (
              <div className="absolute menuChild top-0 left-full w-[900px] h-full bg-white z-50 border border-gray-300 flex">
                <div className="h-full w-2 bg-gray-200 shrink-0"></div>
                <div className="grid grid-cols-4 p-5 flex-auto gap-5">
                  {item.child.map((j) => {
                    return (
                      <div>
                        <h5 className="text-second text-base mb-3 font-semibold">
                          {j.title}
                        </h5>
                        {j.child.length > 0 && (
                          <div className="flex flex-col gap-y-2">
                            {j.child.map((i) => {
                              return (
                                <div
                                  onClick={() => {
                                    dispatch(closeCatalog());
                                    navigate("/products");
                                  }}
                                  className="text-base hover:opacity-85 cursor-pointer text-slate-600"
                                >
                                  {i.title}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCatalog;
