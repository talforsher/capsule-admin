import React, { useContext } from "react";
import styles from "./snapshot.module.css";
import { dashboardContext } from "@/context/dashboardContext";
import { Reports } from "@/types/reports";

const Snapshot = () => {
  const { reports } = useContext<any>(dashboardContext);
  return (
    <div className={styles.snapshot}>
      <div className={styles.header}>
        <h1>תמונת מצב</h1>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <img width={100} src="/icons/folder-new.svg" alt="folder-new" />
          <div>
            <div className={styles.summaryItemValue}>
              {reports?.matchesInfo.newCases || "..."}
            </div>
            <div className={styles.summaryItemTitle}>
              <b>תיקים חדשים</b>
            </div>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <img
            width={100}
            src="/icons/folder-not started.svg"
            alt="folder-not started"
          />
          <div>
            <div className={styles.summaryItemValue}>
              {reports?.matchesInfo.waitingCases || "..."}
            </div>
            <div className={styles.summaryItemTitle}>
              <b>תיקים ממתינים</b>
            </div>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <img
            width={100}
            src="/icons/folder-in progress.svg"
            alt="folder-in progress"
          />
          <div>
            <div className={styles.summaryItemValue}>
              {reports?.matchesInfo.inProcess || "..."}
            </div>
            <div className={styles.summaryItemTitle}>
              <b>תיקים בטיפול</b>
            </div>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <img width={100} src="/icons/folder-done.svg" alt="folder-closed" />
          <div>
            <div className={styles.summaryItemValue}>
              {reports?.matchesInfo.closedCases || "..."}
            </div>
            <div className={styles.summaryItemTitle}>
              <b>תיקים סגורים</b>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <h1>הצלבות חדשות במערכת</h1>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>תאריך</th>
            <th>סוג אלימות</th>
            <th>מיקום</th>
            <th>תיקים</th>
            <th>סטטוס</th>
            <th>הועבר ל</th>
          </tr>
        </thead>
        <tbody>
          {reports?.tableInfo.map((item: Reports["tableInfo"][0]) => (
            <tr key={item.caseId}>
              <td>{new Date(item.fileDate).toLocaleDateString("he-IL")}</td>
              <td>{item.violenceType}</td>
              <td>{item.location}</td>
              <td>{item.reports}</td>
              <td>{item.status}</td>
              <td>{item.referredTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Snapshot;
