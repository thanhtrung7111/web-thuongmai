import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../Wrapper";
import AnimateSkeleton from "../AnimateSkeleton";

const ProductListComponent = ({ search }) => {
  return (
    <>
      <div className="product-list">
        <AnimateSkeleton className={"w-20 h-9  xl:container mx-auto mb-3"} />
        <div className="xl:container xl:mx-auto mx-5 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_4fr] gap-x-2 gap-y-2">
            {/* FILTER  */}
            <Wrapper>
              <div className="p-5">
                <AnimateSkeleton className={"h-5 w-full mb-2"} />
                <AnimateSkeleton className={"h-5 w-10 mb-2"} />
                <AnimateSkeleton className={"h-5 w-20 mb-2"} />
                <AnimateSkeleton className={"h-5 w-20 mb-2"} />
                <AnimateSkeleton className={"h-5 w-20 mb-2"} />
                <AnimateSkeleton className={"h-5 w-20 mb-2"} />
                <AnimateSkeleton className={"h-5 w-20 mb-2"} />
                <hr />
                <AnimateSkeleton className={"h-9 w-full mb-2"} />
                <AnimateSkeleton className={"h-9 w-full mb-2"} />
                <AnimateSkeleton className={"h-9 w-full mb-2"} />
              </div>
            </Wrapper>
            {/* DANH MỤC  */}
            <div className="flex flex-col gap-y-2" id="product-list">
              <Wrapper>
                <div className="p-5">
                  <AnimateSkeleton className={"h-9 w-full p-5"} />
                </div>
              </Wrapper>

              <Wrapper>
                <div className="p-5 min-h-96">
                  <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-5 ">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                      return <AnimateSkeleton className={"h-72 w-full"} />;
                    })}
                  </div>

                  <AnimateSkeleton className={"h-9 w-full"} />
                </div>
              </Wrapper>
            </div>
          </div>
        </div>

        <div className="mx-5 xl:container xl:mx-auto">
          <Wrapper>
            <div className="p-5">
              <AnimateSkeleton className={"h-9 w-full mb-2"} />
              <AnimateSkeleton className={"h-56 w-full"} />
            </div>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default ProductListComponent;
