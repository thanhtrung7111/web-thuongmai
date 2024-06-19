import React, { useEffect, useState } from "react";
import Banner3 from "@assets/img/banner3.png";
import Banner1 from "@assets/img/banner1.jpg";
import Banner2 from "@assets/img/banner2.jpg";
import BannerSmall1 from "@assets/img/bannersmall1.jpg";
import BannerSmall2 from "@assets/img/bannersmall2.png";
import Asus from "@assets/img/asus.jpg";
import BannerSlider from "@components/BannerSlider";
import ProductSlider from "@components/ProductSlider";
import Wrapper from "@components/Wrapper";
import CategorySlider from "@components/CategorySlider";
import { useSelector } from "react-redux";
import LoadingView from "../../pages/LoadingView";
const dataBanner = [Banner1, Banner2, Banner3];
const HomeComponent = () => {
  const { products, isLoadingCommon } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(true);
  const [lstProduct, setLstProduct] = useState(null);
  useEffect(() => {
    if (products?.length >= 0 && lstProduct != null) {
      setLoading(false);
    }
  }, [isLoadingCommon]);

  useEffect(() => {
    setLstProduct(products);
  }, []);

  useEffect(() => {
    const getAllCacheData = async () => {};
    getAllCacheData();
    console.log(products);
  }, []);

  return loading ? (
    <LoadingView></LoadingView>
  ) : (
    <>
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper padding={0}>
          <div className="xl:container mx-auto mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
              <BannerSlider data={dataBanner}></BannerSlider>
              <div className="grid lg:grid-rows-2 gap-3 grid-cols-2 grid-rows-1 lg:grid-cols-1">
                <img
                  src={BannerSmall1}
                  className="w-full h-full object-cover object-center"
                  alt=""
                />
                <img
                  src={BannerSmall2}
                  className="w-full h-full object-cover object-center"
                  alt=""
                />
              </div>
            </div>
            <div className=" grid-cols-3 px-10 py-3 items-center justify-between lg:grid hidden">
              <div className="flex items-center gap-x-3 justify-center">
                <i className="ri-refresh-line text-second text-4xl"></i>
                <div>
                  <h6 className="font-semibold text-sm">
                    7 ngày miễn phí trả hàng
                  </h6>
                  <span className="text-xs font-thin text-gray tracking-wider">
                    Trả hàng miễn phí trong 7 ngày
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-3 justify-center">
                <i className="ri-shield-cross-fill text-second text-4xl"></i>
                <div>
                  <h6 className="font-semibold text-sm">
                    Hàng chính hãng 100%
                  </h6>
                  <span className="text-xs font-thin text-gray tracking-wider">
                    Trả hàng miễn phí trong 7 ngày
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-3 justify-center">
                <i className="ri-caravan-fill text-second text-4xl"></i>
                <div>
                  <h6 className="font-semibold text-sm">Miễn phí vận chuyển</h6>
                  <span className="text-xs font-thin text-gray tracking-wider">
                    Trả hàng miễn phí trong 7 ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      {/* SẢN PHẢM BÁN CHẠY  */}
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-2xl text-first">
                Sản phẩm bán chạy
              </h4>
              <a href="#" className="text-gray-light text-sm hover:text-second">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>
            <ProductSlider
              data={lstProduct?.slice(0, 15)}
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
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-2xl text-first">Danh mục</h4>
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
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-2xl text-first">
                Sản phẩm nổi bật
              </h4>
              <a href="#" className="text-gray-light text-sm hover:text-second">
                Xem thêm <i className="ri-arrow-right-s-line"></i>
              </a>
            </div>

            <ProductSlider
              data={lstProduct?.slice(0, 15)}
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
      <div className="mx-5 xl:container xl:mx-auto mb-5">
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

export default HomeComponent;
