import React, { Children } from "react";

const Wrapper = ({ children, style, id }) => {
  return (
    <div
      id={id}
      style={style}
      className={`bg-[#ffffff] rounded-lg shadow-sm border border-slate-200 h-fit`}
    >
      {Children.map(children, (child) => child)}
    </div>
  );
};

export default Wrapper;
