import React from "react";
import AnimateSkeleton from "../../../components/AnimateSkeleton";

const InfomationOrderSkeleton = () => {
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <AnimateSkeleton className={"w-full h-4"}></AnimateSkeleton>
      </div>

      <div className="min-h-96 gap-y-2 flex flex-col mb-5">
        {[...Array(8)].map((item) => {
          return <AnimateSkeleton className={"w-full h-10"}></AnimateSkeleton>;
        })}
      </div>
    </div>
  );
};

export default InfomationOrderSkeleton;
