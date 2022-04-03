import React from "react";
import { Link } from "react-router-dom";
import styles from "./Table.module.css";

const Table = () => {
  return (
    <div className={styles.table}>
      <Link to="/create">➕ Creaty new entry</Link>
    </div>
  );
};

export default Table;
