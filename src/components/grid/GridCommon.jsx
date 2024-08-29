import React, { useEffect, useState } from "react";
export const GridContext = React.createContext();
const GridComponent = ({
  children,
  data = [],
  cellClassName,
  className,
  headerClassName,
  typePage,
}) => {
  const [context, setContext] = useState(data);
  useEffect(() => {
    setContext(data);
  }, [data]);
  return (
    <GridContext.Provider
      value={[context, setContext, cellClassName, headerClassName]}
    >
      <div
        className={`flex w-full ${
          typePage == "overflow" ? "h-[500px] overflow-y-scroll" : ""
        } ${className}`}
      >
        {context.length >= 1 ? children : "Chưa có dữ liệu!"}
      </div>
    </GridContext.Provider>
  );
};

export default GridComponent;
