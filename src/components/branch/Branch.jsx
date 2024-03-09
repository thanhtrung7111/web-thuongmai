import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Branch = ({ locations, onChange }) => {
  const [listComp, setListComp] = useState(null);

  useEffect(() => {
    setListComp(locations);

  }, [locations]);

  return (
    <div>
      <div className="flex flex-col gap-y-1 text-gray-dark">
        <label>Chọn chi nhánh</label>
        <input
          type="text"
          className="border py-2 px-3 outline-second"
          placeholder="Tài khoản của bạn!"
          value={listComp?.COMPNAME}
        />
        <select
          onChange={(e) => onChange(e)}
          name=""
          id=""
          className="border py-2 px-3 outline-second"
        >
          {listComp?.LCTNLIST?.map((item) => {
            return <option value={item.LCTNCODE}>{item.LCTNNAME}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Branch;
