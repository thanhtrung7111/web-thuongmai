import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchProductsQuery,
  useFetchQUOMQuery,
} from "../../redux/query/commonQuery";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InfoPage from "../../components/InfoPage";
import Wrapper from "../../components/Wrapper";
import CheckBoxList from "../../components/CheckBoxList";
import NumberFormikForm from "../../components/formikCustomForm/NumberFormikForm";
import ButtonForm from "../../components/commonForm/ButtonForm";
import TagList from "../../components/TagList";
import ProductCard from "../../components/ProductCard";
import ProductCardHorizon from "../../components/ProductCardHorizon";
import ProductListSkeleton from "./component/ProductListSkeleton";
import ProductSlider from "../../components/ProductSlider";
import Panigation from "../../components/panigation/Panigation";
let pageSize = 20;
const tagsSort = [
  {
    id: 3,
    name: "Giá tăng dần",
  },
  {
    id: 1,
    name: "Giá giảm dần",
  },
  {
    id: 2,
    name: "Sản phẩm mới nhất",
  },
  {
    id: 4,
    name: "Sản phẩm bán chạy nhất",
  },
  // {
  //   id: 5,
  //   name: "Đã bán nhiều nhất",
  // },
];
const ProductListPage = () => {
  const { errorServer } = useSelector((state) => state.exception);
  const { selectedCategory } = useSelector((state) => state.category);
  const {
    data: products,
    refetch,
    isFetching,
    isLoading: isLoadingProducts,
  } = useFetchProductsQuery();
  const {
    data: lstQUOM,
    isLoading: isLoadingQUOM,
    isError: isErrorQUOM,
  } = useFetchQUOMQuery();
  const minPrice = useRef();
  const maxPrice = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayVertical, setDisplayVertical] = useState(true);
  const [desc, setDesc] = useState(false);
  const [changeTagSort, setChangeTagSort] = useState(tagsSort[0]);
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
    // dispatch(openBlock());
  };

  const closeMenu = () => {
    document.getElementById("filter-menu").classList.remove("show-filter");
    document.getElementById("overlay").style.visibility = "hidden";
    // dispatch(closeBlock());
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
    setProductList(products);
  };

  const onChangeTag = (value) => {
    setChangeTagSort(value);
  };

  const filterPrice = (minValue, maxValue) => {
    if (minValue && maxValue == null) {
      products.filter((item) => item.PRCEDSCN >= minValue);
      return;
    }

    if (minValue == null && maxValue) {
      products.filter((item) => item.PRCEDSCN <= maxValue);
      return;
    }
    if (minValue > maxValue) {
      return;
    }

    setProductList(
      products.filter(
        (item) => item.PRCEDSCN >= minValue && item.PRCEDSCN <= maxValue
      )
    );
  };

  useEffect(() => {
    if (products != null) {
      setProductList(products);
    }
  }, [products]);

  useEffect(() => {
    setProductList(products);
    setCurrentPage(1);
  }, [products]);

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

  useEffect(() => {
    if (productList?.length > 0) {
      let sortList = productList.slice();
      switch (changeTagSort?.id) {
        case 3:
          setProductList([...sortList?.reverse()]);
          break;
        case 1:
          setProductList([
            ...sortList?.sort((a, b) => {
              if (a.PRDCNAME.toLowerCase() > b.PRDCNAME.toLowerCase()) {
                return desc ? -1 : 1;
              } else if (a.PRDCNAME.toLowerCase() < b.PRDCNAME.toLowerCase()) {
                return desc ? 1 : -1;
              } else return 0;
            }),
          ]);
          break;
        case 2:
          setProductList([
            ...sortList?.sort((a, b) => {
              if (a.PRCEDSCN - b.PRCEDSCN > 0) {
                return desc ? -1 : 1;
              } else if (a.PRCEDSCN - b.PRCEDSCN < 0) {
                return desc ? 1 : -1;
              } else {
                return 0;
              }
            }),
          ]);
          break;
      }
      setCurrentPage(1);
    }
  }, [changeTagSort, desc]);

  return isLoadingProducts ? (
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
        <InfoPage
          data={
            selectedCategory?.breadcrumb
              ? selectedCategory?.breadcrumb
              : ["Danh mục sản phẩm"]
          }
        />
        <div className="max-w-7xl mx-auto mb-5">
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
                className="fixed md:z-0 z-50 top-0 rounded-md -left-full h-screen overflow-y-scroll md:overflow-y-hidden md:static px-5  md:py-5 py-10 flex flex-col gap-y-3 md:h-fit transition-all duration-200 bg-white"
                id="filter-menu"
              >
                {/* CLose filter menu  */}
                <div
                  className="absolute top-2 right-2 text-end block md:hidden"
                  onClick={closeMenu}
                >
                  <i class="ri-arrow-left-double-line text-2xl text-slate-700 block cursor-pointer px-2 hover:-translate-x-2 transition-transform duration-200"></i>
                </div>

                <div className="flex gap-x-2 items-center">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="outline-none border w-full text-sm px-4 py-1 text-slate-700 rounded-md"
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
                    <h5 className="text-sm text-slate-600 font-semibold">
                      Khoảng giá
                    </h5>
                    {/* <i className="ri-arrow-down-s-line"></i> */}
                  </div>
                  <Formik
                    initialValues={{
                      minPrice: 0,
                      maxPrice: 0,
                    }}
                    validationSchema={() =>
                      Yup.object().shape({
                        minPrice: Yup.number().min(
                          90000,
                          "Giá tối thiểu 90,000 VNĐ"
                        ),
                        maxPrice: Yup.number()
                          .max(1000000, "Giá tối đa 1,000,000 VNĐ")
                          .test(
                            "greater-or-equal",
                            "Giá trị tối đa phải lớn hơn giá trị tối thiểu!",
                            function (value) {
                              return value >= this.parent.minPrice;
                            }
                          ),
                      })
                    }
                    onSubmit={(value) => {
                      filterPrice(value.minPrice, value.maxPrice);
                    }}
                  >
                    {() => {
                      return (
                        <Form className="flex flex-col gap-y-2">
                          <NumberFormikForm
                            unit="VNĐ"
                            placeholder="Nhập giá trị tối thiểu..."
                            name="minPrice"
                          ></NumberFormikForm>
                          <NumberFormikForm
                            unit="VNĐ"
                            placeholder="Nhập giá trị tối đa..."
                            name="maxPrice"
                          ></NumberFormikForm>
                          <ButtonForm
                            type="submit"
                            label={"Tìm kiếm"}
                          ></ButtonForm>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>

                {/* NHU CẦU  */}

                {/* Màn hình */}

                {/* Thời gian phản hồi  */}
              </div>
            </Wrapper>
            {/* DANH MỤC  */}
            <div className="flex flex-col gap-y-2" id="product-list">
              {selectedCategory?.breadcrumb && (
                <Wrapper>
                  <div className="text-slate-600 px-5 py-4 font-medium text-xl">
                    {selectedCategory?.breadcrumb.join(" - ")} (
                    {productList?.length ? productList.length : "0"} Sản phẩm)
                  </div>{" "}
                  {/* <div className="px-5 pb-4">
                    <h5 className="flex items-center text-xl italic mb-2 text-white bg-slate-700 px-2 py-3 font-semibold">
                      Sản phẩm nổi bật
                    </h5>
                    <div className="grid grid-cols-4 gap-x-2">
                      {productList?.slice(0, 4).map((item) => {
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
                  </div> */}
                </Wrapper>
              )}

              <Wrapper>
                <div className="px-5 py-4">
                  <div className="grid grid-cols-1 gap-y-5 md:flex items-center justify-between">
                    <div className="flex items-center gap-x-3 flex-wrap">
                      <button className="text-slate-700 text-sm cursor-pointer">
                        Sắp xếp theo
                      </button>
                      <TagList
                        data={tagsSort}
                        tagName={"name"}
                        tagID={"id"}
                        onChange={onChangeTag}
                      ></TagList>
                    </div>
                  </div>
                </div>
              </Wrapper>
              <Wrapper>
                <div className="p-5 pt-2 min-h-96">
                  <div className="flex items-center gap-x-4 justify-end mb-2">
                    <div className="text-sm text-slate-700">
                      <span>Sản phẩm trên trang </span>
                      {(currentPage - 1) * pageSize + 1} -{" "}
                      {(currentPage - 1) * pageSize + pageSize}
                    </div>
                    <div className="flex items-center">
                      <div
                        onClick={() => setDisplayVertical(true)}
                        className={`cursor-pointer px-2 rounded-md border  ${
                          displayVertical
                            ? "border-second"
                            : "border-transparent"
                        }`}
                      >
                        <i
                          class={`ri-grid-line text-lg ${
                            displayVertical ? "text-second" : "text-gray-600"
                          }`}
                        ></i>
                      </div>
                      <div
                        onClick={() => setDisplayVertical(false)}
                        className={`cursor-pointer px-2 rounded-md border  ${
                          !displayVertical
                            ? "border-second"
                            : "border-transparent"
                        }`}
                      >
                        <i
                          class={`ri-list-check text-lg ${
                            !displayVertical ? "text-second" : "text-slate-600"
                          }`}
                        ></i>
                      </div>
                    </div>
                  </div>
                  {productList?.length <= 0 ? (
                    <p className="text-gray-500">
                      {" "}
                      Không có sản phẩm bạn tìm thấy!{" "}
                    </p>
                  ) : !displayVertical ? (
                    <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-2 ">
                      {productList
                        ?.slice(
                          (currentPage - 1) * pageSize,
                          (currentPage - 1) * pageSize + pageSize
                        )
                        .map((item) => {
                          return (
                            <ProductCardHorizon
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
                            ></ProductCardHorizon>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-4 ">
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

        <div className="max-w-7xl mx-auto">
          <Wrapper>
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-xl text-slate-600">
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

export default ProductListPage;
