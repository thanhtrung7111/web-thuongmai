import React from "react";
const InfoPage = ({ data }) => {
  return (
    <div className="xl:container xl:mx-auto mx-5 text-gray-dark font-semibold text-base flex items-center justify-start gap-x-1 mb-2">
      <i className="ri-home-line"></i>
      {data.map((item) => {
        return (
          <div key={item}>
            <i className="ri-arrow-right-s-line leading-none h-fit"></i>
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InfoPage;
