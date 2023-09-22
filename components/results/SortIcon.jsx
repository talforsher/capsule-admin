import React from "react";
import styles from "./results.module.css";

const SortIcon = ({ sort, value, setSort }) => {
  if (sort.value === value) {
    return (
      <i
        className={`fas fa-sort-${sort.direction === "asc" ? "up" : "down"}`}
        onClick={() => {
          setSort({
            value,
            direction: sort.direction === "asc" ? "desc" : "asc",
          });
        }}
      />
    );
  } else {
    return (
      <i
        className="fas fa-sort"
        onClick={() => {
          setSort({ value, direction: "asc" });
        }}
      />
    );
  }
};

export default SortIcon;
