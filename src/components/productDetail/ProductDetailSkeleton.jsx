import React from "react";
import AnimateSkeleton from "../AnimateSkeleton";
import Wrapper from "../Wrapper";
const ProductDetailSkeleton = () => {
  return (
    <div className="product-detail">
      <AnimateSkeleton className={"w-20 h-9  xl:container mx-auto mb-3"} />
      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="px-7 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] xl:grid-cols-[2fr_3fr] gap-x-16 gap-y-10">
              {/* HÌNH SẢN PhẢM  */}
              <AnimateSkeleton className={"w-full h-[400px]"} />

              {/* THÔNG TIN SẢN PHẨM  */}
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                  <AnimateSkeleton className={"w-full h-9"} />

                  {/* PRICE  */}
                  <AnimateSkeleton className={"w-36 h-9"} />

                  {/* STAR  */}
                  <AnimateSkeleton className={"w-80 h-9"} />

                  <AnimateSkeleton className={"w-20 h-9"} />
                </div>

                {/* OPTION  */}
                <AnimateSkeleton className={"w-56 h-20"} />
                {/* ACTION  */}
                <div className="flex flex-col gap-y-5">
                  <AnimateSkeleton className={"w-60 h-28"} />
                </div>
              </div>
            </div>
          </div>

          <div className=" grid-cols-3 px-10 py-3 gap-x-5 items-center justify-between lg:grid hidden border-t border-gray-100">
            <AnimateSkeleton className={"w-full h-28"} />
            <AnimateSkeleton className={"w-full h-28"} />
            <AnimateSkeleton className={"w-full h-28"} />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
