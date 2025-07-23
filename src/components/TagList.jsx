import React, { useState } from "react";

const TagList = ({ data, tagName, tagID, onChange }) => {
  const [selected, setSelected] = useState(data[0][tagID]);
  const onclickTag = (value) => {
    setSelected(value[tagID]);
    // console.log(value);
    onChange(value);
  };
  return (
    <div className="flex items-center gap-x-2">
      {data &&
        data.map((item, index) => {
          return item[tagID] == selected ? (
            <div className="relative text-xs text-slate-700 px-3 py-1.5 border w-fit rounded-md border-second">
              {item[tagName]}
              <div class="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-second border-l-[20px]  border-l-transparent border-b-transparent ">
                <i className=" w-3 h-3 absolute -top-[22px] text-xs right-0 ri-check-line text-white"></i>
              </div>
            </div>
          ) : (
            <div
              className="relative text-xs text-slate-700 px-3 py-1.5 border w-fit rounded-md cursor-pointer"
              onClick={() => onclickTag(item)}
            >
              {item[tagName]}
            </div>
          );
        })}
    </div>
  );
};

export default TagList;
