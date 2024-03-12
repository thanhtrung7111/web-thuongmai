import React, { useState } from "react";
export const GridContext = React.createContext();
const GridComponent = ({ children }) => {
  const data = [
    { id: "1", name: "hello", price: 500 },
    { id: "2", name: "llll", price: 533 },
    { id: "7", name: "llll", price: 800 },
    { id: "3", name: "2211", price: 900 },
    { id: "4", name: "3311", price: 1000 },
    { id: "5", name: "4411", price: 200 },
    { id: "6", name: "5511", price: 150 },
  ];
  console.log(
    data.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
  );
  const [context, setContext] = useState(data);
  return (
    <GridContext.Provider value={[context, setContext]}>
      <div className="flex w-full">{children}</div>
    </GridContext.Provider>
  );
};

export default GridComponent;
