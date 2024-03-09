import React, { useState } from "react";

const TabComponent = ({ data, id, name, currentIndex, onChange }) => {
  return (
    <div className="flex items-center border-b border-gray-100 ">
      {data.map((item) => {
        return (
          <div
            onClick={() => onChange(item)}
            className={`px-5 text-sm py-1 border-b-2 cursor-pointer transition-colors duration-300 ${
              currentIndex[id] == item[id]
                ? "border-second text-second"
                : "text-gray-dark border-none"
            }`}
          >
            {item[name]}
          </div>
        );
      })}
    </div>
  );
};

export default TabComponent;
