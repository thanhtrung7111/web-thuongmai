import React from "react";
import Wrapper from "../Wrapper";
import AnimateSkeleton from "../AnimateSkeleton";
const SearchProductSkeleton = () => {
  return (
    <>
      <div className="xl:container xl:mx-auto mb-5">
        <AnimateSkeleton className={"h-10 w-full"} />
      </div>
      <div className="xl:container xl:mx-auto mx-5 mb-5">
        <Wrapper>
          <div className="p-5 min-h-96">
            <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3  xl:grid-cols-5 ">
              {Array(10)
                .fill("-")
                .map((item) => {
                  return <AnimateSkeleton className={"h-[300px] w-full"} />;
                })}
            </div>

            <AnimateSkeleton className={"h-10 w-full"} />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SearchProductSkeleton;
