import React from "react";
import AnimateSkeleton from "../AnimateSkeleton";
import Wrapper from "../Wrapper";

const ProductDetailEvaluateSkeleton = () => {
  return (
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
  );
};

export default ProductDetailEvaluateSkeleton;
