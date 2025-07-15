import React from "react";

const menu = [
  {
    title: "Lap top",
    icon: <i className="ri-macbook-line"></i>,
    child: [
      {
        title: "Thương hiệu",
        child: [
          { title: "ASUS" },
          { title: "MSI" },
          { title: "LENOVO" },
          { title: "DELL" },
          { title: "HP" },
          { title: "LG" },
        ],
      },
      {
        title: "Giá bán",
        child: [
          { title: "Dưới 15 triệu" },
          { title: "Từ 15 đến 20 triệu" },
          { title: "Trên 20 triệu" },
        ],
      },
      {
        title: "CPU",
        child: [
          { title: "Intel Core i3" },
          { title: "Intel Core i5" },
          { title: "Intel Core i7" },
          { title: "AMD Ryzen" },
        ],
      },
      {
        title: "Nhu cầu sử dụng",
        child: [
          { title: "Đồ họa" },
          { title: "Gamming" },
          { title: "Văn phòng" },
        ],
      },
    ],
  },
  {
    title: "Màn hình",
    icon: <i className="ri-tv-2-line"></i>,
    child: [
      {
        title: "Thương hiệu",
        child: [
          { title: "ASUS" },
          { title: "MSI" },
          { title: "LENOVO" },
          { title: "DELL" },
          { title: "HP" },
          { title: "LG" },
        ],
      },
      {
        title: "Giá bán",
        child: [
          { title: "Dưới 15 triệu" },
          { title: "Từ 15 đến 20 triệu" },
          { title: "Trên 20 triệu" },
        ],
      },
      {
        title: "CPU",
        child: [
          { title: "Intel Core i3" },
          { title: "Intel Core i5" },
          { title: "Intel Core i7" },
          { title: "AMD Ryzen" },
        ],
      },
      {
        title: "Nhu cầu sử dụng",
        child: [
          { title: "Đồ họa" },
          { title: "Gamming" },
          { title: "Văn phòng" },
        ],
      },
    ],
  },
];

const ProductCatalog = () => {
  return (
    <div className="border border-slate-400 w-full rounded-md h-full relative bg-gray-100">
      {menu.map((item) => {
        return (
          <div className="menuParent">
            <div className="flex items-center text-slate-700 border-b border-slate-400 hover:text-white hover:bg-second transition-colors justify-between cursor-pointer px-3 py-1">
              <div className="flex items-center gap-x-2  text-xs">
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </div>
              {item.child.length > 0 && (
                <i className="ri-arrow-right-s-line font-semibold"></i>
              )}
            </div>{" "}
            {item.child.length > 0 && (
              <div className="absolute menuChild top-0 left-full w-[900px] h-full bg-white z-50 border border-gray-300 flex">
                <div className="h-full w-2 bg-gray-200 shrink-0"></div>
                <div className="grid grid-cols-4 p-5 flex-auto gap-5">
                  {item.child.map((j) => {
                    return (
                      <div>
                        <h5 className="text-second text-sm mb-3 font-semibold">
                          {j.title}
                        </h5>
                        {j.child.length > 0 && (
                          <div className="flex flex-col gap-y-2">
                            {j.child.map((item) => {
                              return (
                                <span className="text-sm hover:opacity-85 cursor-pointer text-slate-600">
                                  {item.title}
                                </span>
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
