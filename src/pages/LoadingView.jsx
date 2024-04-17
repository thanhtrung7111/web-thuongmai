import React from "react";

const LoadingView = () => {
  return (
    <div className="xl:container xl:mx-auto mt-10 mx-5 min-h-[500px] flex gap-x-2 justify-center">
      <img
        class="w-10 h-10 animate-spin"
        src="https://www.svgrepo.com/show/70469/loading.svg"
        alt="Loading icon"
      ></img>
      <span className="text-lg text-gray-dark">Đang tải dữ liệu</span>
    </div>
  );
};

export default LoadingView;
