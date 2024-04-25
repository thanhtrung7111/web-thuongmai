import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginLCTN } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const Branch = ({ locations, onChange }) => {
  const dispatch = useDispatch();
  const [compSelected, setCompSelected] = useState("");
  const [lctnSelected, setLctnSelected] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setCompSelected(locations[0]);
  }, [locations]);

  useEffect(() => {
    setLctnSelected(
      compSelected?.LCTNLIST ? compSelected?.LCTNLIST[0]?.LCTNCODE : ""
    );
  }, [compSelected]);
  const handleLogin = async () => {
    const body = {
      COMPCODE: compSelected?.COMPCODE,
      LCTNCODE: lctnSelected,
    };
    dispatch(loginLCTN(body));
    navigate("/");
    console.log(lctnSelected);
  };
  return (
    <div>
      <div className="flex flex-col gap-y-1 text-gray-dark">
        <label>Chọn chi nhánh</label>
        <select
          onChange={(e) =>
            setCompSelected(
              locations.find((item) => item.COMPCODE == e.target.value)
            )
          }
          name=""
          id=""
          className="border py-2 px-3 outline-second"
        >
          {locations?.map((item) => {
            return <option value={item.COMPCODE}>{item.COMPNAME}</option>;
          })}
        </select>
        <select
          onChange={(e) => setLctnSelected(e.target.value)}
          name=""
          id=""
          className="border py-2 px-3 outline-second"
        >
          {compSelected?.LCTNLIST?.map((item) => {
            return <option value={item.LCTNCODE}>{item.LCTNNAME}</option>;
          })}
        </select>
      </div>
      <button
        className="bg-second block w-full mt-5 text-white py-3 text-center px-3 hover:bg-opacity-90 transition-all duration-200"
        onClick={handleLogin}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default Branch;
