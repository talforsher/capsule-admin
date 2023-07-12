import React, { useContext } from "react";
import styles from "./right-pane.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { dashboardContext } from "@/context/dashboardContext";

const RightPane = () => {
  const router = useRouter();
  const isActive = (path: string) => {
    return router.query.tab?.[0] === path;
  };

  const { user } = useContext<any>(dashboardContext);

  return (
    <div className={styles.rightPane}>
      <div className={styles.logo}>
        <Link href="/dashboard">
          <img src="/logo.svg" alt="logo" />
        </Link>
      </div>
      <div className={styles.links}>
        <Link
          href="/"
          className={`${styles.link} ${
            isActive("dashboard") ? styles.active : ""
          }`}
        >
          <img
            src={`/icons/snapshot${isActive("dashboard") ? "-active" : ""}.svg`}
            alt="snapshot"
            className={styles.icon}
          />
          <span>תמונת מצב</span>
        </Link>
        <Link
          href="/results"
          className={`${styles.link} ${
            isActive("results") ? styles.active : ""
          }`}
        >
          <img
            src={`/icons/results${isActive("results") ? "-active" : ""}.svg`}
            alt="results"
            className={styles.icon}
          />
          <span>הצלבות</span>
        </Link>
      </div>
      <div className={styles.user}>
        <div className={styles.name}>
          <img src="/icons/user.svg" alt="user" />
          {user?.name || "אורח"}
        </div>
        <div
          className={styles.logout}
          onClick={
            () => {}
            // ()=> logout()
          }
        >
          <img src="/icons/logout.svg" alt="logout" />
          יציאה מהמערכת
        </div>
      </div>
    </div>
  );
};

export default RightPane;
