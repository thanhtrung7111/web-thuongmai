import React from "react";

const LoadingView = () => {
  return (
    <div class="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
      <div class="h-3 w-3 bg-second rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-3 w-3 bg-second rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-3 w-3 bg-second rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingView;
