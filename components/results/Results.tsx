import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./results.module.css";
import { dashboardContext } from "@/context/dashboardContext";
import ViolenceTypeColors from "../violence-type-colors/ViolenceTypeColors";
import Fuse from "fuse.js";
import SortIcon from "./SortIcon";
import Filters from "./Filters";

const statuses = [
  { name: "פתוח", color: "#F2994A" },
  { name: "סגור", color: "#F87171" },
  { name: "בטיפול", color: "#FBD34D" },
];

const Results = () => {
  const { reports } = useContext<any>(dashboardContext);

  const thRef = useRef([]);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sort, setSort] = useState({ value: "location", direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilterToDisplay, setCurrentFilterToDisplay] = useState(null);
  const [filters, setFilters] = useState([]);

  const fuse = new Fuse(reports?.tableInfo, {
    keys: ["caseId", "location", "status", "referredTo"],
  });

  useEffect(() => {
    if (search === "") {
      setResults(reports?.tableInfo || []);
    } else {
      const result = fuse.search(search);
      setResults(result.map((item) => item.item));
    }
  }, [search, reports]);

  useEffect(() => {
    if (sort.value) {
      const sorted = [...results].sort((a, b) => {
        if (a[sort.value] < b[sort.value]) {
          return sort.direction === "asc" ? -1 : 1;
        }
        if (a[sort.value] > b[sort.value]) {
          return sort.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setResults(sorted);
    }
  }, [sort, results]);

  useEffect(() => {
    if (filters.length > 0) {
      const filtered = [...reports.tableInfo].filter((item) => {
        return filters.includes(item[currentFilterToDisplay]);
      });
      setResults(filtered);
    } else {
      setResults(reports?.tableInfo || []);
    }
  }, [filters, reports, currentFilterToDisplay]);

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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="חיפוש"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.tableButtons}>
            <button className={styles.filterButton}>
              <i className="fas fa-filter" /> סינון
            </button>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              {[
                { name: "ייצוא", value: null },
                { name: "מזהה תיק", value: "caseId" },
                { name: "דיווח אחרון", value: "fileDate" },
                { name: "דיווחים", value: "reports" },
                { name: "סוג אלימות", value: "violenceType" },
                { name: "מיקום", value: "location" },
                { name: "סטטוס", value: "status" },
                { name: "גורם מטפל", value: "referredTo" },
                { name: "פרטים", value: "details" },
              ].map((item, index) => (
                <th key={index}>
                  <span
                    ref={(el) => (thRef.current[index] = el)}
                    onClick={() => {
                      setCurrentFilterToDisplay(item.value);
                      setShowFilters(true);
                      setFilters([]);
                    }}
                  >
                    {item.name}
                  </span>
                  {"  "}
                  <SortIcon sort={sort} value={item.value} setSort={setSort} />
                  {showFilters && currentFilterToDisplay === item.value && (
                    <Filters
                      setShowFilters={setShowFilters}
                      filter={item.value}
                      setFilters={setFilters}
                      reports={reports}
                      position={thRef.current[index].getBoundingClientRect()}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
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
                <td>
                  <i
                    className="fas fa-circle"
                    style={{
                      color: statuses.find(
                        (status) => status.name === item.status
                      ).color,
                    }}
                  />
                  {"  "}
                  {item.status}
                </td>
                <td>{item.referredTo}</td>
                <td>
                  <button className={styles.detailsButton}>
                    <i
                      className={`fas fa-chevron-down ${styles.chevronDown}`}
                    />
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
