import React, { useEffect, useRef, useState } from "react";
import Wrapper from "@components/Wrapper";
import ProductCard from "@components/ProductCard";
import ProductSlider from "@components/ProductSlider";
import { tagsRam } from "../../data";
import TagList from "@components/TagList";
import Panigation from "@components/panigation/Panigation";
import InfoPage from "@components/InfoPage";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxList from "../CheckBoxList";
import { closeBlock, openBlock } from "../../redux/reducer/popupReducer";
import LoadingView from "../../pages/LoadingView";
import { loadProduct } from "../../redux/actions/commonAction";
import ProductListSkeleton from "./ProductListSkeleton";
let pageSize = 20;
const tagsSort = [
  {
    id: 3,
    name: "Tất cả",
  },
  {
    id: 1,
    name: "Sắp xếp theo tên",
  },
  {
    id: 2,
    name: "Sắp xếp theo giá",
  },
];
const ProductListComponent = ({ search }) => {
  const dispatch = useDispatch();
  const minPrice = useRef();
  const maxPrice = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, lstQUOM, isLoadingCommon } = useSelector(
    (state) => state.common
  );
  const [productList, setProductList] = useState(null);
  const [listSearch, setListSearch] = useState({
    nameSearch: "",
    lstQUOMSearch: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const showMenu = () => {
    document.getElementById("filter-menu").classList.add("show-filter");
    document.getElementById("overlay").style.visibility = "visible";
    // document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    dispatch(openBlock());
  };

  const closeMenu = () => {
    document.getElementById("filter-menu").classList.remove("show-filter");
    document.getElementById("overlay").style.visibility = "hidden";
    dispatch(closeBlock());
    // document.getElementsByTagName("body")[0].style.overflowY = "scroll";
  };

  const onchangeQUOM = (item) => {
    if (!listSearch.lstQUOMSearch.includes(item.ITEM_KEY)) {
      setListSearch({
        ...listSearch,
        lstQUOMSearch: [...listSearch.lstQUOMSearch, item.ITEM_KEY],
      });
    } else {
      setListSearch({
        ...listSearch,
        lstQUOMSearch: listSearch?.lstQUOMSearch?.filter((itemFind) => {
          return itemFind != item.ITEM_KEY;
        }),
      });
    }
    console.log(listSearch);
  };

  const searchNameProduct = (e) => {
    setListSearch({ ...listSearch, nameSearch: e.target.value });
  };

  const handleRefresh = () => {
    dispatch(
      loadProduct({
        DCMNCODE: "appPrdcList",
        PARACODE: "001",
        LCTNCODE: "%",
        LGGECODE: "{{0302}}",
        SCTNCODE: 1,
        JSTFDATE: "1990-01-01",
        KEY_WORD: "%",
        SHOPCODE: "%",
        CUSTCODE: "%",
      })
    );
    setLoading(true);
    setRefresh(!refresh);
    setListSearch({
      nameSearch: "",
      lstQUOMSearch: [],
    });
  };

  const onChangeTag = (value) => {
    console.log(value);
    switch (value?.id) {
      case 3:
        setProductList([...productList?.reverse()]);
        break;
      case 1:
        setProductList([
          ...productList?.sort((a, b) =>
            a.PRDCNAME.toLowerCase().localeCompare(b.PRDCNAME.toLowerCase())
          ),
        ]);
        break;
      case 2:
        setProductList([
          ...productList?.sort((a, b) => a.PRCEDSCN - b.PRCEDSCN),
        ]);
        break;
    }
  };

  const filterPrice = () => {
    if (minPrice.current.value && maxPrice.current.value == null) {
      products.filter((item) => item.PRCEDSCN >= minPrice.current.value);
      return;
    }

    if (minPrice.current.value == null && maxPrice.current.value) {
      products.filter((item) => item.PRCEDSCN <= maxPrice.current.value);
      return;
    }
    if (minPrice.current.value > maxPrice.current.value) {
      return;
    }

    setProductList(
      products.filter(
        (item) =>
          item.PRCEDSCN >= minPrice.current.value &&
          item.PRCEDSCN <= maxPrice.current.value
      )
    );
  };

  useEffect(() => {
    if (
      products?.length >= 0 &&
      isLoadingCommon === false &&
      productList?.length >= 0
    ) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [productList?.length, products]);

  useEffect(() => {
    setProductList(products);
    setCurrentPage(1);
  }, [products]);

  useEffect(() => {
    setLoading(true);
  }, [search]);

  useEffect(() => {
    async function search() {
      let productSearch = await products;
      if (listSearch.lstQUOMSearch.length > 0) {
        productSearch = await productSearch?.filter((item) => {
          return listSearch.lstQUOMSearch.includes(item.QUOMCODE + "");
        });
      }
      productSearch = await productSearch?.filter((item) =>
        item?.PRDCNAME.toLowerCase().includes(
          listSearch.nameSearch.toLowerCase()
        )
      );
      setProductList(productSearch);
      setCurrentPage(1);
    }
    search();
  }, [listSearch]);

  return loading ? (
    <ProductListSkeleton />
  ) : (
    // <ProductListSkeleton />
    <>
      <div
        className="fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-10 z-40 md:hidden invisible"
        onClick={closeMenu}
        id="overlay"
      ></div>
      <div className="product-list">
        <InfoPage data={["Danh mục sản phẩm"]} />
        <div className="xl:container xl:mx-auto mx-5 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_4fr] gap-x-2 gap-y-2">
            {/* MENU  */}
            <div
              onClick={showMenu}
              id="filter-toggle"
              className="md:hidden z-20 fixed bottom-12 flex items-center gap-x-1 border px-2 py-1 shadow-lg justify-center rounded-sm bg-second text-white cursor-pointer hover:scale-125 transition-transform duration-200"
            >
              <i class="ri-filter-fill"></i>
            </div>

            {/* FILTER  */}
            <Wrapper>
              <div
                className="fixed md:z-0 z-50 top-0 -left-full h-screen overflow-y-scroll md:overflow-y-hidden md:static px-5  md:py-5 py-10 flex flex-col gap-y-3 md:h-fit transition-all duration-200 bg-white"
                id="filter-menu"
              >
                {/* CLose filter menu  */}
                <div
                  className="absolute top-2 right-2 text-end block md:hidden"
                  onClick={closeMenu}
                >
                  <i class="ri-arrow-left-double-line text-2xl text-gray-dark block cursor-pointer px-2 hover:-translate-x-2 transition-transform duration-200"></i>
                </div>

                <div className="flex gap-x-2 items-center">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="outline-none border w-full text-sm px-2 py-1 text-gray-dark"
                    placeholder="Tìm kiếm..."
                    value={listSearch.nameSearch}
                    onChange={(e) => searchNameProduct(e)}
                  />
                  <div
                    className="transform hover:rotate-180 transition duration-500 ease-in-out cursor-pointer"
                    onClick={handleRefresh}
                    title="Làm mới bộ lọc"
                  >
                    <i className="ri-refresh-line text-xl text-gray-dark"></i>
                  </div>
                </div>
                {/* THƯƠNG HIỆU  */}
                <CheckBoxList
                  onRefresh={refresh}
                  title={"Đơn vị tính"}
                  data={lstQUOM}
                  itemName={"ITEMNAME"}
                  itemKey={"ITEM_KEY"}
                  onChange={onchangeQUOM}
                ></CheckBoxList>
                {/* KHOẢNG GIÁ  */}
                <div className="pb-5 border-b">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-gray-dark font-medium">Khoảng giá</h5>
                    {/* <i className="ri-arrow-down-s-line"></i> */}
                  </div>
                  <div className="flex gap-y-2 flex-col">
                    <input
                      type="number"
                      ref={minPrice}
                      min={100000}
                      placeholder="Từ: 100.000VNĐ"
                      className="border px-3 py-2 w-full outline-none text-gray-dark text-sm rounded-md"
                    />
                    <input
                      type="number"
                      min={100000}
                      ref={maxPrice}
                      p
                      placeholder="Đến: 10.000.000VNĐ"
                      className="border px-3 py-2 w-full outline-none text-gray-dark text-sm rounded-md"
                    />
                    <button
                      onClick={filterPrice}
                      className="py-2 px-1 text-white bg-second rounded-md"
                    >
                      Lọc
                    </button>
                  </div>
                </div>

                {/* NHU CẦU  */}

                {/* Màn hình */}

                {/* Thời gian phản hồi  */}
              </div>
            </Wrapper>
            {/* DANH MỤC  */}
            <div className="flex flex-col gap-y-2" id="product-list">
              <Wrapper>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3 flex-wrap">
                      <span className="text-gray-dark">Sắp xếp:</span>
                      <TagList
                        data={tagsSort}
                        tagName={"name"}
                        tagID={"id"}
                        onChange={onChangeTag}
                      ></TagList>
                    </div>

                    <div className="flex items-center gap-x-4">
                      <div className="text-sm text-gray-dark">
                        <span>Sản phẩm trên trang </span>
                        {(currentPage - 1) * pageSize + 1} -{" "}
                        {(currentPage - 1) * pageSize + pageSize}
                      </div>
                      <div className="flex items-center gap-x-2">
                        <div>
                          <i class="ri-grid-line text-lg"></i>
                        </div>
                        <div>
                          <i class="ri-list-check text-lg"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Wrapper>

              <Wrapper>
                <div className="p-5 min-h-96">
                  {productList?.length <= 0 ? (
                    <p className="text-gray-500">
                      {" "}
                      Không có sản phẩm bạn tìm thấy!{" "}
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-5 ">
                      {productList
                        ?.slice(
                          (currentPage - 1) * pageSize,
                          (currentPage - 1) * pageSize + pageSize
                        )
                        .map((item) => {
                          return (
                            <ProductCard
                              item={item}
                              unit={"QUOMNAME"}
                              id={"PRDCCODE"}
                              name={"PRDCNAME"}
                              // reviews={""}
                              image={"PRDCIMGE"}
                              price={"PRCESALE"}
                              discount={"DSCNRATE"}
                              // stars={item.rating.rate}
                              saleOff={"PRCEDSCN"}
                              sold={0}
                            ></ProductCard>
                          );
                        })}
                    </div>
                  )}
                  {productList?.length > 20 && (
                    <Panigation
                      currentPage={currentPage}
                      totalCount={
                        productList?.length > 0 ? productList.length : 0
                      }
                      pageSize={pageSize}
                      scrollTo="product-list"
                      onPageChange={(page) => setCurrentPage(page)}
                    ></Panigation>
                  )}
                </div>
              </Wrapper>
            </div>
          </div>
        </div>

        <div className="mx-5 xl:container xl:mx-auto">
          <Wrapper>
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-2xl text-first">
                  Sản phẩm liên quan
                </h4>
                <a href="#" className="text-gray-light">
                  Xem thêm <i className="ri-arrow-right-s-line"></i>
                </a>
              </div>
              <ProductSlider
                data={products?.slice(0, 10)}
                id={"PRDCCODE"}
                name={"PRDCNAME"}
                unit={"QUOMNAME"}
                image={"PRDCIMGE"}
                price={"PRCESALE"}
                reviews={"rating"}
                stars={"rating"}
                saleOff={"PRCEDSCN"}
                sold={""}
              ></ProductSlider>
            </div>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default ProductListComponent;
