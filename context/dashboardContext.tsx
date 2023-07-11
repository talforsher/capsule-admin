import { Reports } from "@/types/reports";
import React, { createContext, useState } from "react";

export const dashboardContext = createContext({});
const DashboardContextProvider = ({ children }: any) => {
  const [user, setUser] = useState("");
  const [reports, setReports] = useState<Reports>();
  const context = {
    user,
    setUser,
    reports,
    setReports,
  };
  return (
    <dashboardContext.Provider value={context}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardContextProvider;
