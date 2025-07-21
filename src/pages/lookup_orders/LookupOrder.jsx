import React from "react";
import InfoPage from "../../components/InfoPage";
import Wrapper from "../../components/Wrapper";

const LookupOrder = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <InfoPage data={["Tra cứu đơn hàng"]} />
      <div className="">
        <Wrapper>
          <div className="px-5 py-5">
            <div className="text-lg font-semibold text-slate-700">
              Nhập thông tin tra cứu
            </div>
          </div>
          <div className="px-5 py-5">
            <div className="text-base font-semibold text-slate-700 mb-2">
              Thông tin vận đơn
            </div>
            <div className="text-slate-400 text-sm min-h-[500px]">
              Chưa có thông tin đơn hàng...
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default LookupOrder;
