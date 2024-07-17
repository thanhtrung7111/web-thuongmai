import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@components/ProductCard";
import Panigation from "@components/panigation/Panigation";
import { loadProduct } from "../../redux/actions/commonAction";
import LoadingView from "../../pages/LoadingView";
import AnimateSkeleton from "../AnimateSkeleton";
let pageSize = 4;
const ProductSuggestion = ({ keyword }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { products } = useSelector((state) => state.common);
  const [lstProduct, setLstProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    products.data?.length > 0 &&
      setLstProduct(
        products.data?.filter((item) => item.PRDCNAME.indexOf(keyword) >= 0)
      );
  }, [keyword]);

  useEffect(() => {
    if (open == true) {
      dispatch(
        loadProduct({
          DCMNCODE: "appPrdcList",
          PARACODE: "001",
          LCTNCODE: "001",
          LGGECODE: "{{0302}}",
          SCTNCODE: 1,
          JSTFDATE: "1990-01-01",
          KEY_WORD: "keyword",
          SHOPCODE: "%",
          CUSTCODE: "%",
        })
      );
    }
  }, [open]);

  return (
    <>
      <span
        onClick={() => setOpen(!open)}
        className="w-32 text-center hover:text-second transition-colors duration-100 text-xs cursor-pointer"
      >
        Tìm các sản phẩm liên quan ?{" "}
      </span>

      <div
        className={`${
          open ? "visible opacity-100 z-10" : "invisible opacity-0"
        } absolute top-full right-0 w-[1000px] h-fit rounded-lg bg-white border shadow-2xl`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold text-second text-xl">
            Sản phẩm liên quan
          </span>
          <i
            class="ri-close-line cursor-pointer text-xl"
            onClick={() => setOpen(false)}
          ></i>
        </div>
        {products.isLoading ? (
          <div className="p-5 pt-1 min-h-96">
            {[1, 2, 3, 4].forEach((item) => {
              return <AnimateSkeleton className={"h-72 w-full"} />;
            })}
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
                  scrollTo="product-list"
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
