import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Table from "./components/Table/Table";
import Create from "./components/Create/Create";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Table className={styles.table} />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
