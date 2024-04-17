import React, { Children } from "react";

const Wrapper = ({ children, style, id }) => {
  return (
    <div
      id={id}
      style={style}
      className={`bg-[#ffffff] rounded-xl overflow-hidden shadow-lg border border-gray-100 h-fit`}
    >
      {Children.map(children, (child) => child)}
    </div>
  );
};

export default Wrapper;
