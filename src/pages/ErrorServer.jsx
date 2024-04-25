import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorServer = () => {
  const navigate = useNavigate();
  return (
    <div className="p-60">
      <div className="flex">
        <i class="ri-tools-line text-7xl"></i>
        <h2 className="text-7xl">500</h2>
      </div>
      <p className="text-2xl text-gray-dark font-medium">Lỗi server</p>
      <p className="text-gray-dark">
        Chúng tôi sẽ sớm khắc phục. Xin lỗi vì sự bất tiện này!
      </p>
      <button
        className="border-none rounded-lg py-1 px-3"
        onClick={() => navigate("/login")}
      >
        Đăng nhập
      </button>
    </div>
  );
};

export default ErrorServer;
