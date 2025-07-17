import React, { useEffect, useState } from "react";
import Banner3 from "../../assets/img/banner3.png";
import Banner1 from "../../assets/img/banner1.jpg";
import Banner2 from "../../assets/img/banner2.jpg";
import BannerSmall1 from "../../assets/img/bannersmall1.jpg";
import BannerSmall2 from "../../assets/img/bannersmall2.png";
import Asus from "../../assets/img/asus.jpg";
import { useSelector } from "react-redux";
import HomeSkeleton from "./component/HomeSkeleton";
import {
  useFetchBannerDataTypeQuery,
  useFetchBannerQuery,
  useFetchBannerTypeQuery,
  useFetchProductsQuery,
  useLazyFetchProductsQuery,
} from "../../redux/query/commonQuery";
import BannerSlider from "../../components/BannerSlider";
import ProductSlider from "../../components/ProductSlider";
import CategorySlider from "../../components/CategorySlider";
import Wrapper from "../../components/Wrapper";
import ProductCatalog from "../../components/menu/ProductCatalog";
import ImageFetch from "../../components/ImageFetch";
const dataBanner = [Banner1, Banner2, Banner3];
const HomePage = () => {
  const tokenLocation = sessionStorage.getItem("tokenLocation");
  const tokenInitial = sessionStorage.getItem("tokenInitial");
  const { errorServer } = useSelector((state) => state.exception);

  const {
    data: products,
    refetch,
    isFetching,
    isLoading,
  } = useFetchProductsQuery();

  const getBanners = useFetchBannerQuery();
  const getBannerType = useFetchBannerTypeQuery();
  const getBannerDataType = useFetchBannerDataTypeQuery();
  // const [getProducts, { isLoading: loadingProducts, isError }] =
  //   useGetProductsMutation();

  // useEffect(() => {
  //   if (tokenLocation != null || tokenInitial) {
  //     fetchProduct();
  //   }
  // }, [tokenLocation]);
  useEffect(() => {
    navigator.storage.estimate().then(({ usage, quota }) => {
      const usedMB = (usage / 1024 / 1024).toFixed(2);
      const totalMB = (quota / 1024 / 1024).toFixed(2);
      console.log(`Đã dùng: ${usedMB} MB`);
      console.log(`Tổng quota: ${totalMB} MB`);
    });
  }, []);

  useEffect(() => {}, [getBanners.data]);

  return isFetching ? (
    <HomeSkeleton />
  ) : (
    <>
      <div className="max-w-7xl mx-auto mb-5">
        <div className="mb-5">
          <div className="flex gap-x-2">
            <div className="w-64 shrink-0">
              <ProductCatalog></ProductCatalog>
            </div>
            <div>
              <div className="flex-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 py-1">
                <BannerSlider data={dataBanner}></BannerSlider>
                <div className="grid lg:grid-rows-2 gap-3 grid-cols-2 grid-rows-1 lg:grid-cols-1">
                  {getBanners.data &&
                    getBanners.data
                      .filter(
                        (item) => item.BANRTYPE == "002" && item.BANR_RUN == 1
                      )
                      .slice(0, 2)
                      .map((item) => {
                        return (
                          <ImageFetch
                            key={item?.DCMNFILE?.[0]?.KKKK0001}
                            url={item?.DCMNFILE?.[0]?.FILE_URL ?? ""}
                            id={item?.DCMNFILE?.[0]?.KKKK0001 ?? ""}
                            className="w-full h-full object-cover object-center rounded-md"
                          />
                        );
                      })}
                  {/* <img
                    src={BannerSmall1}
                    className="w-full h-full object-cover object-center rounded-md"
                    alt=""
                  />
                  <img
                    src={BannerSmall2}
                    className="w-full h-full object-cover object-center  rounded-md"
                    alt=""
                  /> */}
                </div>
              </div>
              <div className="flex-auto grid grid-cols-1 lg:grid-cols-3 gap-3 py-1 rounded-md">
                {/* <img
                  src={BannerSmall1}
                  className="w-full h-full object-cover object-center rounded-md"
                  alt=""
                />
                <img
                  src={BannerSmall2}
                  className="w-full h-full object-cover object-center rounded-md"
                  alt=""
                />
                <img
                  src={BannerSmall2}
                  className="w-full h-full object-cover object-center rounded-md"
                  alt=""
                /> */}
                {getBanners.data &&
                  getBanners.data
                    .filter(
                      (item) => item.BANRTYPE == "002" && item.BANR_RUN == 1
                    )
                    .slice(0, 3)
                    .map((item) => {
                      return (
                        <ImageFetch
                          key={item?.DCMNFILE?.[0]?.KKKK0001}
                          url={item?.DCMNFILE?.[0]?.FILE_URL ?? ""}
                          id={item?.DCMNFILE?.[0]?.KKKK0001 ?? ""}
                          className="w-full h-full object-cover object-center rounded-md"
                        />
                      );
                    })}
              </div>
            </div>
          </div>
          <div className=" grid-cols-3 gap-x-3 py-3 items-center justify-between lg:grid hidden">
            <Wrapper>
              <div className="flex items-center gap-x-3 justify-center py-5">
                <i className="ri-refresh-line text-second text-4xl"></i>
                <div>
                  <h6 className="font-semibold text-sm text-slate-700">
                    7 ngày miễn phí trả hàng
                  </h6>
                  <span className="text-xs font-thin text-slate-500 tracking-wider">
                    Trả hàng miễn phí trong 7 ngày
                  </span>
                </div>
              </div>
            </Wrapper>
            <Wrapper>
              <div className="flex items-center gap-x-3 justify-center py-5">
                <i className="ri-shield-cross-fill text-second text-4xl"></i>
                <div>
                  <h6 className="font-semibold text-sm text-slate-700">
                    Hàng chính hãng 100%
                  </h6>
                  <span className="text-xs font-thin text-slate-500 tracking-wider">
                    Trả hàng miễn phí trong 7 ngày
                  </span>
                </div>
              </div>
            </Wrapper>
            <Wrapper>
              <div className="flex items-center gap-x-3 justify-center py-5">
                <i className="ri-caravan-fill text-second text-4xl"></i>
                <div>
                  <h6 className="font-semibold text-sm text-slate-700">
                    Miễn phí vận chuyển
                  </h6>
                  <span className="text-xs font-thin text-slate-500 tracking-wider">
                    Trả hàng miễn phí trong 7 ngày
                  </span>
                </div>
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
      {/* SẢN PHẢM BÁN CHẠY  */}
      <div className="mx-auto max-w-7xl mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-slate-600 text-xl font-semibold">
                Sản phẩm bán chạy
              </h4>
              <a href="#" className="text-gray-light text-sm hover:text-second">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>
            <ProductSlider
              data={products?.length >= 1 ? products?.slice(0, 15) : []}
              id={"PRDCCODE"}
              name={"PRDCNAME"}
              image={"PRDCIMGE"}
              unit={"QUOMNAME"}
              discount={"DSCNRATE"}
              price={"PRCESALE"}
              reviews={"rating"}
              stars={"rating"}
              saleOff={"PRCEDSCN"}
              sold={""}
            ></ProductSlider>
          </div>
        </Wrapper>
      </div>
      <div className="mx-auto max-w-7xl mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xl text-slate-600 font-semibold">Danh mục</h4>
              <a href="#" className="text-gray-light text-sm hover:text-second">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>
            <CategorySlider
              data={[
                {
                  id: 1,
                  name: "Máy tinh",
                  image:
                    "https://cdn.mediamart.vn/images/news/14-thu-thuat-tren-may-tinh-ma-ban-khong-nen-bo-qua-H0WCR7.jpg",
                },
                {
                  id: 2,
                  name: "Laptop",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUHxMP7VWESAjnxcdDQ9exuOdrIPT-GTbJX-0rSXAp0A&s",
                },
                {
                  id: 3,
                  name: "Tablet",
                  image:
                    "https://p2-ofp.static.pub/fes/cms/2021/10/28/juqs65pgl1gh3dysi7yv1tnvtsiqva364946.png",
                },
              ]}
              id="id"
              name="name"
              image="image"
            ></CategorySlider>
          </div>
        </Wrapper>
      </div>
      {/* SẢN PHẢM NỔI BẬT  */}
      <div className="mx-auto max-w-7xl mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-xl text-slate-600 font-semibold">
                Sản phẩm nổi bật
              </h4>
              <a href="#" className="text-gray-light text-sm hover:text-second">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>

            <ProductSlider
              data={products?.length >= 1 ? products?.slice(0, 15) : []}
              id={"PRDCCODE"}
              name={"PRDCNAME"}
              image={"PRDCIMGE"}
              unit={"QUOMNAME"}
              discount={"DSCNRATE"}
              price={"PRCESALE"}
              reviews={"rating"}
              stars={"rating"}
              saleOff={"PRCEDSCN"}
              sold={""}
            ></ProductSlider>
          </div>
        </Wrapper>
      </div>
      {/* Bàn phím
      <div className="max-w-7xl mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-2xl text-gray-500 relative">
                Bàn phím
              </h4>
              <a href="#" className="text-gray-light text-sm hover:text-second">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>
            <ProductSlider
              data={lstProduct?.slice(0, 10)}
              id={"PRDCCODE"}
              name={"PRDCNAME"}
              unit={"QUOMNAME"}
              image={"PRDCIMGE"}
              price={"PRCEDSCN"}
              reviews={"rating"}
              stars={"rating"}
              saleOff={"PRCESALE"}
              sold={""}
            ></ProductSlider>
          </div>
        </Wrapper>
      </div> */}
      <Wrapper></Wrapper>
    </>
  );
};

export default HomePage;
