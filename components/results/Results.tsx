import React, { useContext, useState } from "react";
import styles from "./results.module.css";
import { dashboardContext } from "@/context/dashboardContext";
import ViolenceTypeColors from "../violence-type-colors/ViolenceTypeColors";

const Results = () => {
  const { reports } = useContext<any>(dashboardContext);

  return (
    <div className={styles.results}>
      <div className={styles.header}>
        <h1>תמונת מצב</h1>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div className={styles.tableSearch}>
            <i className={`fas fa-search ${styles.searchIcon}`} />
            <input
              type="text"
              placeholder="חיפוש"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.tableButtons}>
            <button className={styles.sortButton}>
              <i className="fas fa-sort" /> מיון
            </button>
            <button className={styles.filterButton}>
              <i className="fas fa-filter" /> סינון
            </button>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ייצוא</th>
              <th>מזהה תיק</th>
              <th>דיווח אחרון</th>
              <th>דיווחים</th>
              <th>סוג אלימות</th>
              <th>מיקום</th>
              <th>סטטוס</th>
              <th>גורם מטפל</th>
              <th>פרטים</th>
            </tr>
          </thead>
          <tbody>
            {reports?.tableInfo.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.caseId}</td>
                <td>{new Date(item.fileDate).toLocaleDateString("he-IL")}</td>
                <td>{item.reports}</td>
                <td>
                  <ViolenceTypeColors type={item.violenceType} />
                </td>
                <td>{item.location}</td>
                <td>{item.status}</td>
                <td>{item.referredTo}</td>
                <td>
                  <button className={styles.detailsButton}>
                    <i className="fas fa-chevron-left" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
