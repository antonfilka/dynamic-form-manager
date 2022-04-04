import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/home">
        <h2> 📋 List</h2>
      </Link>
      <Link to="/create">
        <h2> ✏️ Create / Edit</h2>
      </Link>
    </div>
  );
};

export default Header;
