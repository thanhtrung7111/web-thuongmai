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

      {/* ĐÁNH GIÁ SẢN PHẨM  */}
      <div id="evaluate" className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <AnimateSkeleton className={"w-60 h-9"} />
              </div>
              <AnimateSkeleton className={"w-full h-52"} />
            </div>

            <div>
              <div className="flex flex-col gap-y-4 mb-8 min-h-[550px]">
                {[1, 2, 3, 4].map((item) => {
                  return (
                    <div className="flex gap-x-1 border-b border-gray-100 pb-4">
                      <AnimateSkeleton className={"w-16 h-16 rounded-full"} />
                      <div className="flex flex-col gap-y-1">
                        <div className="flex gap-x-3 items-center">
                          <AnimateSkeleton className={"w-96 h-5"} />
                        </div>
                        <AnimateSkeleton className={"w-40 h-5"} />
                        <AnimateSkeleton className={"w-72 h-5"} />
                        <AnimateSkeleton className={"w-[700px] h-5"} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <AnimateSkeleton className={"w-full h-9"} />
            </div>
          </div>
        </Wrapper>
      </div>

      <div className="mx-5 xl:container xl:mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <AnimateSkeleton className={"w-full h-9"} />
            <AnimateSkeleton className={"w-full h-56"} />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
