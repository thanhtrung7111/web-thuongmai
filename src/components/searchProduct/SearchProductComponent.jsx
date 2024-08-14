import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "@components/Wrapper";
import ProductCard from "@components/ProductCard";
import ProductCardHorizon from "@components/ProductCardHorizon";
import Panigation from "@components/panigation/Panigation";
import InfoPage from "@components/InfoPage";
import SearchProductSkeleton from "./SearchProductSkeleton";
let pageSize = 20;
const SearchProductComponent = ({ searchName }) => {
  const [displayVertical, setDisplayVertical] = useState(true);
  const { products } = useSelector((state) => state.common);
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    if (products.data != null) {
      searchName != null && searchName != ""
        ? setProductList({
            data: products.data.filter(
              (item) =>
                item.PRDCNAME.toLowerCase().indexOf(searchName.toLowerCase()) >=
                0
            ),
            isLoading: false,
          })
        : setProductList({ data: [], isLoading: false });
    } else {
      setProductList({ data: [], isLoading: true });
    }
  }, [products.data]);
  console.log(searchName);
  return productList.isLoading ? (
    <SearchProductSkeleton></SearchProductSkeleton>
  ) : (
    <>
      <InfoPage data={["Sản phẩm", searchName]} />
      <div className="xl:container xl:mx-auto mx-5 mb-5" id="product-search">
        <Wrapper>
          <div className="p-5 min-h-96">
            {productList.data?.length <= 0 ? (
              <p className="text-gray-500"> Không có sản phẩm bạn tìm thấy! </p>
            ) : !displayVertical ? (
              <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-2 ">
                {productList.data
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
              <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-5 ">
                {productList.data
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
            {productList.data?.length > 20 && (
              <Panigation
                currentPage={currentPage}
                totalCount={
                  productList.data?.length > 0 ? productList.data.length : 0
                }
                pageSize={pageSize}
                scrollTo="product-search"
                onPageChange={(page) => setCurrentPage(page)}
              ></Panigation>
            )}
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SearchProductComponent;
