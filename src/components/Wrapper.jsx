import React, { Children } from "react";

const Wrapper = ({ children, style, id }) => {
  return (
    <div
      id={id}
      style={style}
      className={` bg-white rounded-lg overflow-hidden shadow-sm border-t border-gray-100 h-fit`}
    >
      {Children.map(children, (child) => child)}
    </div>
  );
};

export default Wrapper;
