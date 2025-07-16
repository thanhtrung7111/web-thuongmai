import React from "react";
const InfoPage = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto text-base flex items-center justify-start gap-x-1 mb-2">
      <div>
        <i class="ri-home-3-line text-slate-500"></i>
      </div>
      {data.map((item) => {
        return (
          <div key={item} className="flex items-center">
            <i className="ri-arrow-right-s-line leading-none h-fit text-slate-500"></i>
            <span className="text-slate-500">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoPage;
