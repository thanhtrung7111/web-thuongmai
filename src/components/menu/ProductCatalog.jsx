import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { closeCatalog } from "../../redux/reducer/popupReducer";
import { setSelectedCategory } from "../../redux/reducer/categoryReducer";

const menu = [
  {
    title: "Lap top",
    icon: <i className="ri-macbook-line"></i>,
    id: "laptop",
    breadcrumb: ["Laptop"],
    child: [
      {
        title: "Thương hiệu",
        breadcrumb: ["Laptop", "Thương hiệu"],
        id: "brand",
        child: [
          {
            title: "ASUS",
            id: "ASUS",
            breadcrumb: ["Laptop", "Thương hiệu", "ASUS"],
          },
          {
            title: "MSI",
            id: "MSI",
            breadcrumb: ["Laptop", "Thương hiệu", "MSI"],
          },
          {
            title: "LENOVO",
            id: "LENOVO",
            breadcrumb: ["Laptop", "Thương hiệu", "LENOVO"],
          },
          {
            title: "DELL",
            id: "DELL",
            breadcrumb: ["Laptop", "Thương hiệu", "DELL"],
          },
          {
            title: "HP",
            id: "HP",
            breadcrumb: ["Laptop", "Thương hiệu", "HP"],
          },
          {
            title: "LG",
            id: "LG",
            breadcrumb: ["Laptop", "Thương hiệu", "LG"],
          },
        ],
      },
      {
        title: "Giá bán",
        id: "price",
        breadcrumb: ["Laptop", "Giá bán"],
        child: [
          {
            title: "Dưới 15 triệu",
            id: "below",
            breadcrumb: ["Laptop", "Giá bán", "Dưới 15 triệu"],
          },
          {
            title: "Từ 15 đến 20 triệu",
            id: "upper",
            breadcrumb: ["Laptop", "Giá bán", "Từ 15 đến 20 trieu"],
          },
          {
            title: "Trên 20 triệu",
            id: "above",
            breadcrumb: ["Laptop", "Giá bán", "Trên 20 triệu 15 triệu"],
          },
        ],
      },
      {
        title: "CPU",
        id: "CPU",
        breadcrumb: ["Laptop", "CPU"],
        child: [
          {
            title: "Intel Core i3",
            id: "i3",
            breadcrumb: ["Laptop", "CPU", "Intel Core i3"],
          },
          {
            title: "Intel Core i5",
            id: "i5",
            breadcrumb: ["Laptop", "CPU", "Intel Core i5"],
          },
          {
            title: "Intel Core i7",
            id: "i7",
            breadcrumb: ["Laptop", "CPU", "Intel Core i7"],
          },
          {
            title: "AMD Ryzen",
            id: "ryzen",
            breadcrumb: ["Laptop", "CPU", "AMD Ryzen"],
          },
        ],
      },
      {
        title: "Nhu cầu sử dụng",
        id: "CPU",
        breadcrumb: ["Laptop", "Nhu cầu sử dụng"],
        child: [
          {
            title: "Đồ họa",

            breadcrumb: ["Laptop", "Nhu cầu sử dụng", "Đồ họa"],
          },
          {
            title: "Gamming",

            breadcrumb: ["Laptop", "Nhu cầu sử dụng", "Gamming"],
          },
          {
            title: "Văn phòng",
            breadcrumb: ["Laptop", "Nhu cầu sử dụng", "Văn phòng"],
          },
        ],
      },
    ],
  },
  {
    title: "Màn hình",
    icon: <i className="ri-tv-2-line"></i>,
    breadcrumb: ["Màn hình"],
    child: [
      {
        title: "Thương hiệu",
        breadcrumb: ["Màn hình", "Thương hiệu"],
        id: "brand",
        child: [
          {
            title: "ASUS",
            id: "ASUS",
            breadcrumb: ["Màn hình", "Thương hiệu", "ASUS"],
          },
          {
            title: "MSI",
            id: "MSI",
            breadcrumb: ["Màn hình", "Thương hiệu", "MSI"],
          },
          {
            title: "LENOVO",
            id: "LENOVO",
            breadcrumb: ["Màn hình", "Thương hiệu", "LENOVO"],
          },
          {
            title: "DELL",
            id: "DELL",
            breadcrumb: ["Màn hình", "Thương hiệu", "DELL"],
          },
          {
            title: "HP",
            id: "HP",
            breadcrumb: ["Màn hình", "Thương hiệu", "HP"],
          },
          {
            title: "LG",
            id: "LG",
            breadcrumb: ["Màn hình", "Thương hiệu", "LG"],
          },
        ],
      },
      {
        title: "Giá bán",
        id: "price",
        breadcrumb: ["Màn hình", "Giá bán"],
        child: [
          {
            title: "Dưới 15 triệu",
            id: "below",
            breadcrumb: ["Màn hình", "Giá bán", "Dưới 15 triệu"],
          },
          {
            title: "Từ 15 đến 20 triệu",
            id: "upper",
            breadcrumb: ["Màn hình", "Giá bán", "Từ 15 đến 20 trieu"],
          },
          {
            title: "Trên 20 triệu",
            id: "above",
            breadcrumb: ["Màn hình", "Giá bán", "Trên 20 triệu 15 triệu"],
          },
        ],
      },
      {
        title: "CPU",
        id: "CPU",
        breadcrumb: ["Màn hình", "CPU"],
        child: [
          {
            title: "Intel Core i3",
            id: "i3",
            breadcrumb: ["Màn hình", "CPU", "Intel Core i3"],
          },
          {
            title: "Intel Core i5",
            id: "i5",
            breadcrumb: ["Màn hình", "CPU", "Intel Core i5"],
          },
          {
            title: "Intel Core i7",
            id: "i7",
            breadcrumb: ["Màn hình", "CPU", "Intel Core i7"],
          },
          {
            title: "AMD Ryzen",
            id: "ryzen",
            breadcrumb: ["Màn hình", "CPU", "AMD Ryzen"],
          },
        ],
      },
      {
        title: "Nhu cầu sử dụng",
        id: "CPU",
        breadcrumb: ["Màn hình", "Nhu cầu sử dụng"],
        child: [
          {
            title: "Đồ họa",

            breadcrumb: ["Màn hình", "Nhu cầu sử dụng", "Đồ họa"],
          },
          {
            title: "Gamming",

            breadcrumb: ["Màn hình", "Nhu cầu sử dụng", "Gamming"],
          },
          {
            title: "Văn phòng",
            breadcrumb: ["Màn hình", "Nhu cầu sử dụng", "Văn phòng"],
          },
        ],
      },
    ],
  },
  // {
  //   title: "Sản phẩm",
  //   link: "/products",
  //   icon: <i className="ri-instance-line"></i>,
  //   child: [],
  // },
];

const ProductCatalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="border border-slate-300 w-full rounded-md h-full relative bg-gray-50 min-h-[500px]">
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
                                    dispatch(setSelectedCategory(i));
                                    dispatch(closeCatalog());
                                    navigate("/products");
                                  }}
                                  className="text-xs hover:opacity-85 cursor-pointer text-slate-600"
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
