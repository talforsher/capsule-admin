import React, { useContext } from "react";
import styles from "./snapshot.module.css";
import { dashboardContext } from "@/context/dashboardContext";
import { Reports } from "@/types/reports";
import { useRouter } from "next/router";

const Snapshot = () => {
  const { reports } = useContext<any>(dashboardContext);
  const { push } = useRouter();
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
        <button
          className={styles.headerAction}
          onClick={() => push("/results")}
        >
          לכל ההצלבות <i className="fas fa-arrow-left" />
        </button>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableHeaderRow}>
            <th>מזהה תיק</th>
            <th>דיווח אחרון</th>
            <th>דיווחים</th>
            <th>סוג אלימות</th>
            <th>מיקום</th>
            <th>סטטוס</th>
            <th>הועבר ל</th>
          </tr>
        </thead>
        <tbody>
          {reports?.tableInfo.map((item: Reports["tableInfo"][0]) => (
            <tr key={item.caseId}>
              <td>{item.caseId}</td>
              <td>{new Date(item.fileDate).toLocaleDateString("he-IL")}</td>
              <td>{item.reports}</td>
              <td>{item.violenceType}</td>
              <td>{item.location}</td>
              <td>{item.status}</td>
              <td>{item.referredTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.header}>
        <h1>דיווחים חדשים</h1>
        <button
          className={styles.headerAction}
          onClick={() => push("/reports")}
        >
          לכל הדיווחים <i className="fas fa-arrow-left" />
        </button>
      </div>
      <div className={styles.newReports}>
        {reports?.newReports.map((item: Reports["newReports"][0]) => (
          <div key={item.reportId} className={styles.newReport}>
            <div className={styles.newReportId}>
              <span>מספר דיווח:</span>
              <span>{item.reportId}</span>
              {
                <img
                  width={20}
                  src={`/icons/flag${item.complaintFiled ? "-active" : ""}.svg`}
                  alt="flag"
                  className={styles.flag}
                />
              }
            </div>
            <div className={styles.newReportContent}>
              <div className={styles.newReportDate}>
                <span>תאריך:</span>
                <span>{new Date(item.date).toLocaleDateString("he-IL")}</span>
              </div>
              <div className={styles.newReportViolenceType}>
                <span>סוג תקיפה:</span>
                <span>{item.violenceType}</span>
              </div>
              <div className={styles.newReportLocation}>
                <span>מיקום:</span>
                <span>{item.location}</span>
              </div>
              <hr className="pink border" />
              <div className={styles.newReportStatus}>
                <span>
                  {item.complaintFiled ? (
                    <i className="fas fa-check pink" />
                  ) : (
                    <>
                      <i className="fas fa-times" /> לא
                    </>
                  )}{" "}
                  הוגשה תלונה
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Snapshot;
