import React from "react";
import styles from "./Create.module.css";

const ModeLabel = (props) => {
  return (
    <div className={styles.mode}>
      <label className={styles.Tlabel}>Mode: </label>
      {props.editMode ? (
        <label className={styles.Mlabel}>Edit</label>
      ) : (
        <label className={styles.Mlabel}>Create</label>
      )}
    </div>
  );
};

export default ModeLabel;
