import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Wrapper from "@components/Wrapper";
export const PaySuccessVietQR = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const response = searchParams.get("response");
  return (
    <div>
      <div className="xl:container xl:mx-auto mx-5">
        <Wrapper>
          <div className="p-5 text-center min-h-[500px]">
            <h4 className="font-medium text-gray-dark text-xl mb-6">
              {response == "PAID" && "Thanh toán thành công"}
              {response == "PENDING" && "Cần thanh toán hóa đơn"}
              {response == "EXPIRED" && "Hết hạn thanh toán"}
            </h4>
            <Link
              to={"/personal?tab=order"}
              className="outline-none bg-first text-white text-sm px-3 py-2"
            >
              Xem đơn hằng
            </Link>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
