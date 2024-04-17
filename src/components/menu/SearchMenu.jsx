import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { saveSearch } from "@redux/reducer/userReducer";
const data = [
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Cửa kéo 2", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Cửa cuốn", img: "https://picsum.photos/seed/picsum/200/300" },
  {
    name: "Sản phẩm dùng thử",
    img: "https://picsum.photos/seed/picsum/200/300",
  },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
];
const SearchMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");
  const [focus, setFocus] = useState(false);
  const [dataFind, setDataFind] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { productSearchs } = useSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    if (keyWord != "") {
      setDataFind(
        data.filter((item) =>
          item?.name?.toLowerCase().includes(keyWord?.toLowerCase())
        )
      );
    }
    setIsLoading(false);
  }, [keyWord]);

  const handleClick = (value) => {
    setKeyWord(value);
    navigate("/products?search=" + value);
    if (productSearchs.includes(value)) {
      return;
    }
    dispatch(saveSearch(value));
    console.log(value);
  };

  const handleChangeSearch = (e) => {
    setKeyWord(e.target.value);
    console.log(keyWord);
  };
  const handlePress = (event) => {
    if (event.key == "Enter") {
      dispatch(saveSearch(keyWord));
      navigate("/products?search=" + keyWord);
      setFocus(false);
      event.target.blur();
    }
  };
  return (
    <div className="relative flex-auto items-center border border-x-gray-lighter justify-between px-4 py-1 rounded-3xl hidden lg:flex">
      <input
        type="text"
        className="outline-none flex-auto tracking-wider font-normal text-sm text-gray-dark"
        placeholder="Mục tìm sản phẩm, thương hiệu..."
        onChange={handleChangeSearch}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyUp={(event) => handlePress(event)}
        value={keyWord}
      />
      <i className="ri-search-line cursor-pointer text-gray-dark"></i>
      <div
        className={`${
          (keyWord != "" || productSearchs?.length > 0) && focus && "h-56"
        } h-0 overflow-hidden transition-[height] ease-in-out duration-200 delay-100  absolute w-full bg-white top-[110%] left-0 shadow-md rounded-md `}
      >
        {(keyWord != "" || productSearchs?.length) > 0 ? (
          <div>
            {productSearchs?.length > 0 && keyWord == "" && (
              <div>
                <h5 className="text-sm font-medium px-2 py-1 sticky top-0 bg-white">
                  Lịch sử tìm kiếm
                </h5>
                <div className="flex flex-col">
                  {productSearchs.map((item) => {
                    return (
                      <div
                        className="flex items-center gap-x-2 px-2 py-1 hover:bg-gray-50"
                        onClick={() => handleClick(item)}
                      >
                        {/* <img src={item.img} alt="" className="size-8" /> */}
                        <h5 className="text-sm text-gray-dark">{item}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {isLoading
              ? "..."
              : dataFind?.length > 0 &&
                keyWord != "" && (
                  <div className="flex flex-col">
                    {dataFind.map((item) => {
                      return (
                        <div
                          className="flex items-center gap-x-2 px-2 py-1 hover:bg-gray-50"
                          onClick={() => handleClick(item.name)}
                        >
                          {/* <img src={item.img} alt="" className="size-8" /> */}
                          <h5 className="text-sm text-gray-dark">
                            {item.name}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                )}
          </div>
        ) : (
          <div className="text-gray-dark text-sm p-3">
            Không có sản phẩm bạn tìm...
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMenu;
