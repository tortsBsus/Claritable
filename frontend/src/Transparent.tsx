import { FunctionComponent } from "react";
import styles from "./css/Transparent.module.css";

export const Transparent: FunctionComponent = () => {
  return (
    <div className={styles.transparentDiv}>
      <div className={styles.frameDiv}>
       
        <div className={styles.cLARITABLEDiv}>
          <span className={styles.cLARITABLSpan}>CLARITABL</span>
          <span className={styles.eSpan}>E</span>
        </div>
        <div className={styles.hOMEDiv}>
          <span className={styles.hOMESpan}>HOME</span>
          <span className={styles.cLARITABLSpan}>{` `}</span>
        </div>
        <div className={styles.cHARITYDiv}>CHARITY</div>
        <div className={styles.tRACKDiv}>TRACK</div>
      </div>
    </div>
  );
};
