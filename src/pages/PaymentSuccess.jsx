import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Wrapper from "@components/Wrapper";
const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  console.log(vnp_ResponseCode);
  console.log("hELLO");
  return (
    <div>
      <div className="xl:container xl:mx-auto mx-5">
        <Wrapper>
          <div className="p-5 text-center min-h-[500px]">
            <h4 className="font-medium text-gray-dark text-xl mb-6">
              {vnp_ResponseCode == 0
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
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

export default PaymentSuccess;
