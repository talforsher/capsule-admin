import React, { useContext, useEffect } from "react";
import styles from "./app.module.css";
import { dashboardContext } from "@/context/dashboardContext";
import { useRouter } from "next/router";
import Snapshot from "../snapshot/Snapshot";
import Results from "../results/Results";
import axios from "axios";

const App = () => {
  const { setUser, setReports } = useContext(dashboardContext);
  const getUserData = async () => {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ name: "יהודית" });
      }, 1000);
    });
    setUser(data);
  };

  const getReports = async () => {
    const reports = (await axios("/aws/get-alerts")).data;

    const normalizedData = {
      matchesInfo: {
        newCases: reports.length,
        waitingCases: reports.length,
        inProcess: 0,
        closedCases: 0,
      },
      tableInfo: [],
      newReports: reports
    };
    setReports(normalizedData);
  };

  const {
    query: { tab },
  } = useRouter();

  useEffect(() => {
    getUserData();
    getReports();
  }, []);
  
  return (
    <div className={styles.app}>
      {tab?.[0] === "dashboard" && <Snapshot />}
      {tab?.[0] === "results" && <Results />}
    </div>
  );
};

export default App;
