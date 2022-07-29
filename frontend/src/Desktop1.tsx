import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Desktop1.module.css";

export const Desktop1: FunctionComponent = () => {
  const navigate = useNavigate();

  const onCLARITABLETextClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  return (
    <div className={styles.desktop1}>
      <img
        className={styles.unsplashdVcXOkpp3fkIcon}
        alt=""
        src="unsplashdvcxokpp3fk@2x.png"
      />
      <div className={styles.cLARITABLEDiv} onClick={onCLARITABLETextClick}>
        <span className={styles.cLARITABLETxtSpan}>
          <span className={styles.cLARITABLESpan}>CLARITABLE</span>
          <span className={styles.span}>{` `}</span>
        </span>
      </div>
    </div>
  );
};
