import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "./GridCommon";

const Column = ({ title, width, name, hidden = false, component = null }) => {
  const [context, setContext, cellClassName, headerClassName] =
    useContext(GridContext);
  const [desc, setDesc] = useState(false);
  useEffect(() => {
    if (desc) {
      setContext([...context]?.sort((a, b) => a[name] - b[name]));
    } else {
      setContext([...context]?.sort((a, b) => b[name] - a[name]));
    }
  }, [desc]);
  return (
    !hidden && (
      <div
        className={`grid ${!width ? "flex-auto" : ""}`}
        style={{ width: `${width}` }}
      >
        <div
          className={`border-b ${headerClassName} text-gray-dark cursor-pointer sticky top-0`}
          onClick={() => setDesc(!desc)}
        >
          {title ? title : " "}
        </div>
        {context.map((item) =>
          component ? (
            <div className={`border-b text-sm ${cellClassName}`}>
              {component(item)}
            </div>
          ) : (
            <div className={`border-b text-sm ${cellClassName}`}>
              {item[name]}
            </div>
          )
        )}
      </div>
    )
  );
};

export default Column;
