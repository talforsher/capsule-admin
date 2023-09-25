import React, { useContext, useEffect, useRef } from "react";
import styles from "./snapshot.module.css";
import { dashboardContext } from "@/context/dashboardContext";
import { Reports } from "@/types/reports";
import { useRouter } from "next/router";
import ViolenceTypeColors from "../violence-type-colors/ViolenceTypeColors";

const ThreeDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;
        let radius = 10;
        const x = width / 2;
        const y = height / 2;
        const step = (2 * Math.PI) / 3;
        let angle = 0;
        const draw = () => {
          ctx.fillStyle = "#f538a0";
          ctx.clearRect(0, 0, width, height);
          ctx.beginPath();
          ctx.arc(
            x + radius * Math.cos(angle),
            y + radius * Math.sin(angle),
            5,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            x + radius * Math.cos(angle + step),
            y + radius * Math.sin(angle + step),
            5,
            0,
            2 * Math.PI
          );
          ctx.fill();
          ctx.beginPath();
          ctx.arc(
            x + radius * Math.cos(angle + 2 * step),
            y + radius * Math.sin(angle + 2 * step),
            5,
            0,
            2 * Math.PI
          );
          ctx.fill();
          angle += 0.01;
          radius = 7 * Math.cos(angle);
          requestAnimationFrame(draw);
        };
        draw();
      }
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <canvas
        ref={canvasRef}
        style={{ width: "50px", height: "50px" }}
        width={50}
        height={50}
      />
    </div>
  );
};

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
            {reports?.matchesInfo.newCases || <ThreeDots />}
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
            {reports?.matchesInfo.waitingCases || <ThreeDots />}
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
            {reports?.matchesInfo.inProcess || <ThreeDots />}
            <div className={styles.summaryItemTitle}>
              <b>תיקים בטיפול</b>
            </div>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <img width={100} src="/icons/folder-done.svg" alt="folder-closed" />
          <div>
            {reports?.matchesInfo.closedCases || <ThreeDots />}
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
              <td>
                <ViolenceTypeColors type={item.violenceType} />
              </td>
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
