import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchProductsQuery } from "../../redux/query/commonQuery";
import Wrapper from "../../components/Wrapper";
import InfoPage from "../../components/InfoPage";
import ProductCardHorizon from "../../components/ProductCardHorizon";
import ProductCard from "../../components/ProductCard";
import Panigation from "../../components/panigation/Panigation";
import { useSearchParams } from "react-router-dom";
let pageSize = 20;
const ProductSearchPage = () => {
  const [searchParam] = useSearchParams();
  const searchName = searchParam.get("name");
  const [productList, setProductList] = useState([]);
  const [displayVertical, setDisplayVertical] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    isLoading,
    isError,
    isFetching,
  } = useFetchProductsQuery();

  useEffect(() => {
    if (products != null) {
      searchName != null && searchName != ""
        ? setProductList({
            data: products.filter(
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
  }, [searchName]);
  console.log(searchName);
  return isLoading ? (
    "Đang tải dữ liệu!"
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

export default ProductSearchPage;
