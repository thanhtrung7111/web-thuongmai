import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeKeyword, saveSearch } from "../../redux/reducer/userReducer";
import {
  useFetchProductsQuery,
  useLazyFetchProductsQuery,
} from "../../redux/query/commonQuery";

const data = [
  { name: "Sản phẩm 1", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Cửa kéo 2", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Cửa cuốn", img: "https://picsum.photos/seed/picsum/200/300" },
  {
    name: "Sản phẩm dùng thử",
    img: "https://picsum.photos/seed/picsum/200/300",
  },
  { name: "Sản phẩm 2", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 3", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 4", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 5", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 6", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 7", img: "https://picsum.photos/seed/picsum/200/300" },
  { name: "Sản phẩm 8", img: "https://picsum.photos/seed/picsum/200/300" },
];
const SearchMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");
  const [focus, setFocus] = useState(false);
  const [dataFind, setDataFind] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { productSearchs } = useSelector((state) => state.user);
  const [disable, setDisable] = useState(false);
  const [indexMove, setIndexMove] = useState(-1);
  const [
    fetchProduct,
    { data: products, isLoading: isLoadingProduct, isError },
  ] = useLazyFetchProductsQuery();
  useEffect(() => {
    setIsLoading(true);
    if (keyWord !== "") {
      // console.log("Run block ");
      // console.log(keyWord);
      setDataFind([
        ...new Set([
          ...data
            .filter(
              (item) =>
                item?.name?.toLowerCase().indexOf(keyWord?.toLowerCase()) > -1
            )
            .map((i) => i.name),
          ...productSearchs.filter(
            (item) => item.toLowerCase().indexOf(keyWord?.toLowerCase()) > -1
          ),
        ]),
      ]);
    } else {
      setDataFind([...productSearchs]);
    }
    setIndexMove(-1);
    setIsLoading(false);
    console.log(productSearchs);
  }, [keyWord, productSearchs?.length]);

  const handleClick = (value) => {
    setKeyWord(value);
    handleSearch(value);
  };

  const handleChangeSearch = (e) => {
    setKeyWord(e.target.value);
  };

  const handlePress = async (event) => {
    // console.log(indexMove);
    if (event.key == "Enter") {
      if (indexMove > -1) {
        setKeyWord(dataFind[indexMove]);
        handleSearch(dataFind[indexMove]);
      }
      handleSearch(keyWord);
    }
    if (event.key == "ArrowDown") {
      console.log(event);
      console.log(indexMove);
      if (indexMove <= -1) {
        setIndexMove(0);
      } else {
        !(indexMove + 1 >= dataFind.length) && setIndexMove(indexMove + 1);
      }
    }
    if (event.key == "ArrowUp") {
      if (indexMove - 1 <= -1) {
        setIndexMove(-1);
        return;
      } else {
        setIndexMove(indexMove - 1);
      }
    }
  };

  const handleSearch = (keySearch) => {
    if (keySearch == "" || keySearch.trim() == "" || keySearch == null) {
      return;
    }
    console.log(productSearchs.indexOf(keySearch));
    if (productSearchs.indexOf(keySearch) <= -1) {
      dispatch(saveSearch(keySearch));
    }
    setDisable(true);
    window.scroll(0, 0);
    navigate("/products/search?name=" + keySearch);
    setFocus(false);
    event.target.blur();
  };

  const removeSearch = (keyword) => {
    console.log(productSearchs);
    dispatch(removeKeyword(keyword));
  };

  // useEffect(() => {
  //   if (indexMove == -1) {
  //     return;
  //   }
  //   setKeyWord(dataFind[indexMove]);
  // }, [indexMove]);
  return (
    <div className="relative w-[550px] items-center border rounded-md justify-between px-0 pr-4 pl-3 h-10 hidden lg:flex">
      <input
        type="text"
        className="outline-none flex-auto text-sm text-gray-dark placeholder:font-medium"
        placeholder="Tìm sản phẩm, thương hiệu..."
        onChange={handleChangeSearch}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          setFocus(false);
        }}
        onKeyUp={(event) => handlePress(event)}
        value={keyWord}
        disabled={isLoadingProduct}
      />
      {isLoadingProduct ? (
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <i
          onClick={handleSearch}
          className="ri-search-line cursor-pointer text-gray-dark"
        ></i>
      )}
      {isLoadingProduct && (
        <div
          className={`${
            (keyWord != "" || productSearchs?.length > 0) &&
            focus &&
            "h-56 !border"
          } h-0 overflow-hidden transition-[height] ease-in-out duration-200 delay-100  border-gray-200 absolute w-full bg-white top-[100%] left-0 shadow-md rounded-sm`}
        >
          {dataFind?.length > 0 ? (
            <div className="overflow-y-scroll h-full">
              {productSearchs?.length > 0 && keyWord == "" && (
                <div>
                  <h5 className="text-sm font-medium px-2 py-1 sticky top-0 bg-white">
                    Lịch sử tìm kiếm
                  </h5>
                  <div className="flex flex-col">
                    {dataFind.map((item, index) => {
                      return (
                        <div
                          onKeyUp={(event) => handlePress(event)}
                          className={`${
                            indexMove == index ? "bg-gray-50" : ""
                          } group  flex items-center justify-between gap-x-2 px-2 py-1 hover:bg-gray-50`}
                          onClick={() => handleClick(item)}
                        >
                          {/* <img src={item.img} alt="" className="size-8" /> */}
                          <h5 className="text-sm text-gray-dark">{item}</h5>
                          <i
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSearch(item);
                            }}
                            class={`opacity-0 group-hover:opacity-100 ri-close-line closeSearch cursor-pointer ${
                              indexMove == index ? "opacity-100" : "opacity-0"
                            }`}
                          ></i>
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
                      {dataFind.map((item, index) => {
                        return (
                          <div
                            onKeyUp={(event) => handlePress(event)}
                            className={`${
                              indexMove == index ? "bg-gray-50" : ""
                            } flex items-center gap-x-2 px-2 py-1 hover:bg-gray-50 cursor-pointer`}
                            onClick={() => handleClick(item)}
                          >
                            {/* <img src={item.img} alt="" className="size-8" /> */}
                            <h5 className="text-sm text-gray-dark">{item}</h5>
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
      )}
    </div>
  );
};

export default SearchMenu;
