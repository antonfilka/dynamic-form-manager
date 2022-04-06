import React from "react";
import styles from "./Create.module.css";

const ModeLabel = ({ editMode }) => {
  return (
    <div className={styles.mode}>
      <label className={styles.Tlabel}>Mode: </label>
      {editMode ? (
        <label className={styles.Mlabel}>Edit</label>
      ) : (
        <label className={styles.Mlabel}>Create</label>
      )}
    </div>
  );
};

export default ModeLabel;
