import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import Panigation from "../panigation/Panigation";
import LoadingView from "../../pages/LoadingView";
import AnimateSkeleton from "../AnimateSkeleton";
import {
  useFetchProductsQuery,
  useLazyFetchProductsQuery,
} from "../../redux/query/commonQuery";
let pageSize = 4;
const ProductSuggestion = ({ keyword, open = false, onClose }) => {
  const [fetchProduct, { data: products, isLoading, isError, isSuccess }] =
    useLazyFetchProductsQuery();
  const [lstProduct, setLstProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
    };
    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess) {
      products?.length > 0 &&
        setLstProduct(
          products?.filter((item) => item.PRDCNAME.indexOf(keyword) >= 0)
        );
    }
  }, [isSuccess]);
  return (
    <>
      <div
        className={`product-suggest ${
          open ? "visible opacity-100 z-10" : "invisible opacity-0"
        } absolute top-full right-0 w-[1000px] h-fit rounded-lg bg-white border shadow-2xl`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold text-second text-xl">
            Sản phẩm liên quan
          </span>
          <i class="ri-close-line cursor-pointer text-xl" onClick={onClose}></i>
        </div>
        {isLoading ? (
          <div className="p-5 pt-1 min-h-96">
            <div className="grid gap-4 mb-4 grid-cols-4">
              {[1, 2, 3, 4].map((item) => {
                return <AnimateSkeleton className={"h-72 w-full"} />;
              })}
            </div>
            <AnimateSkeleton className={"h-10 w-full"} />
          </div>
        ) : (
          <div>
            <div className="p-5 pt-1 min-h-96">
              {lstProduct?.length <= 0 ? (
                <p className="text-gray-500">
                  {" "}
                  Không có sản phẩm bạn tìm thấy!{" "}
                </p>
              ) : (
                <div className="grid gap-4 mb-10 grid-cols-4">
                  {lstProduct
                    ?.slice(
                      (currentPage - 1) * pageSize,
                      (currentPage - 1) * pageSize + pageSize
                    )
                    .map((item) => {
                      return (
                        <ProductCard
                          key={item.PRDCCODE}
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
              {lstProduct?.length > 5 && (
                <Panigation
                  currentPage={currentPage}
                  totalCount={lstProduct?.length > 0 ? lstProduct.length : 0}
                  pageSize={pageSize}
                  scrollTo="product-suggest"
                  onPageChange={(page) => setCurrentPage(page)}
                ></Panigation>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSuggestion;
