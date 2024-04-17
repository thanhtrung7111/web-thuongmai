import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/api";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("hello");
    api
      .post(
        "https://Api-Dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS001",
        {
          COMPCODE: "PMC",
          APP_CODE: "AER",
          SYSTCODE: 4,
        }
      )
      .then((res) => {
        setToken(res.data.RETNDATA.TOKEN);
        sessionStorage.setItem("tokenInitial", res.data.RETNDATA.TOKEN);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <AppContext.Provider value={{ token: token }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
