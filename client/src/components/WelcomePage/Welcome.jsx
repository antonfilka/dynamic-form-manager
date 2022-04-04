import React from "react";
import styles from "./Welcome.module.css";

const Welcome = (props) => {
  return (
    <div className={styles.welcome}>
      Welcome to form manager ✍🏻
      <div className={styles.power}>powered by Antonfilka</div>
    </div>
  );
};

export default Welcome;
