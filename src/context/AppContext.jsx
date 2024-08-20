import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/api";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token: token }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
