import React from "react";
import styles from "./results.module.css";

const Filters = ({ filter, reports, position, setFilters, setShowFilters }) => {
  const reportsFilter = reports
    ? [...new Set(reports.tableInfo.map((item) => item[filter]))]
    : [];

  return (
    <div
      style={{
        top: position.top + 30 + "px",
        left: position.left + "px",
      }}
      className={styles.filters}
    >
      <div className={styles.filtersHeader}>
        <h3>סינון לפי {filter}</h3>
        <button
          onClick={() => {
            setShowFilters(false);
          }}
        >
          <i className="fas fa-times" />
        </button>
      </div>
      <div className={styles.filtersBody}>
        {reportsFilter.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters((prev) => [...prev, item]);
                } else {
                  setFilters((prev) => prev.filter((i) => i !== item));
                }
              }}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
