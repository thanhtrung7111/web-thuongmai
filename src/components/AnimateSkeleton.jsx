import React from "react";

const AnimateSkeleton = ({ className }) => {
  return <div className={`bg-slate-100 ${className} animate-pulse`}></div>;
};

export default AnimateSkeleton;
