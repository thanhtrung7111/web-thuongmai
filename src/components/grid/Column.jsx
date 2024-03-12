import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "./GridComponent";

const Column = ({
  title,
  name,
  width,
  type = "text",
  classHeader,
  classBody,
  sort = false,
}) => {
  const [context, setContext] = useContext(GridContext);
  const [stateSort, setStateSort] = useState(false);
  useEffect(() => {
    if (type == "number") {
      !stateSort
        ? setContext([...context.sort((a, b) => a[name] - b[name])])
        : setContext([...context.sort((a, b) => b[name] - a[name])]);
    } else if (type == "text") {
      !stateSort
        ? setContext([
            ...context.sort((a, b) => {
              const nameA = a[name].toUpperCase(); // ignore upper and lowercase
              const nameB = b[name].toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            }),
          ])
        : setContext([
            ...context.sort((a, b) => {
              const nameA = a[name].toUpperCase(); // ignore upper and lowercase
              const nameB = b[name].toUpperCase(); // ignore upper and lowercase
              if (nameA > nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            }),
          ]);
    }
  }, [stateSort]);

  return (
    <div
      className={`grid ${!width && "flex-auto"}`}
      style={{ width: `${width}` }}
    >
      <div
        className={`border-b text-gray-dark uppercase ${classHeader} cursor-pointer`}
        onClick={() => sort && setStateSort(!stateSort)}
      >
        {title}{" "}
        {sort &&
          (stateSort ? (
            <i class="ri-arrow-up-line text-sm"></i>
          ) : (
            <i class="ri-arrow-down-line text-sm"></i>
          ))}
      </div>
      {context.map((item) => (
        <div className={`border-b text-sm ${classBody}`}>
          {type == "checkbox" ? (
            <input type="checkbox" className="size-3" />
          ) : (
            item[name]
          )}
        </div>
      ))}
    </div>
  );
};

export default Column;
