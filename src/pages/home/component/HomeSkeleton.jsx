import React from "react";
import Wrapper from "../../../components/Wrapper";
import BannerSlider from "../../../components/BannerSlider";
import AnimateSkeleton from "../../../components/AnimateSkeleton";
const HomeSkeleton = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto mb-5">
        <Wrapper padding={0}>
          <div className="xl:container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
              <AnimateSkeleton className={"w-full h-[500px]"} />
              <div className="grid lg:grid-rows-2 gap-3 grid-cols-2 grid-rows-1 lg:grid-cols-1">
                <AnimateSkeleton className={"w-full h-full"} />
                <AnimateSkeleton className={"w-full h-full"} />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      {/* SẢN PHẢM BÁN CHẠY  */}
      <div className="max-w-7xl mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <AnimateSkeleton className={"w-full h-9"} />
            </div>
            <AnimateSkeleton className={"w-full h-60"} />
          </div>
        </Wrapper>
      </div>
      <div className="max-w-7xl mx-auto mb-5">
        <Wrapper>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <AnimateSkeleton className={"w-full h-9"} />
            </div>
            <AnimateSkeleton className={"w-full h-60"} />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default HomeSkeleton;
