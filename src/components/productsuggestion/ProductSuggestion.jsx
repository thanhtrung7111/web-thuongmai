import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "@components/ProductCard";
import Panigation from "@components/panigation/Panigation";
let pageSize = 7;
const ProductSuggestion = ({}) => {
  const [open, setOpen] = useState(false);
  const { products, isLoadingCommon } = useSelector((state) => state.common);
  const [lstProduct, setLstProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLstProduct(products);
  }, []);
  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="w-32 text-center hover:text-second transition-colors duration-100 text-xs cursor-pointer"
      >
        Tìm các sản phẩm liên quan ?{" "}
      </span>
      <div
        className={`${
          open ? "visible opacity-100 z-50" : "invisible opacity-0"
        } absolute top-full right-0 w-[700px] h-56 rounded-sm bg-white border shadow-sm`}
      >
        <div className="flex items-center justify-between px-2 pr-3 py-2">
          <span className="font-semibold">Danh sách sản phẩm liên quan</span>
          <button type="button" onClick={() => setOpen(false)}>
            X
          </button>
        </div>
        <div>
          <div className="p-5 min-h-96">
            {lstProduct?.length <= 0 ? (
              <p className="text-gray-500"> Không có sản phẩm bạn tìm thấy! </p>
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
            {lstProduct?.length > 0 && (
              <Panigation
                currentPage={currentPage}
                totalCount={lstProduct?.length > 0 ? lstProduct.length : 0}
                pageSize={pageSize}
                scrollTo="product-list"
                onPageChange={(page) => setCurrentPage(page)}
              ></Panigation>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSuggestion;
