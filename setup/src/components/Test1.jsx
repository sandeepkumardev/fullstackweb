import React from "react";
import styles from "../styles/test1.module.css";
import sass from "../styles/test.module.scss";

const Test1 = () => {
  return (
    <div className="Test">
      <h1 className={styles.heading}>Test1</h1>

      <p>This is Test1</p>

      <div className={sass.a}>
        <div className={sass.b}>
          <h1>hello</h1>
        </div>

        <div className={sass.c}>
          <h1 className={sass.heading}>hello</h1>
        </div>
      </div>
    </div>
  );
};

export default Test1;
