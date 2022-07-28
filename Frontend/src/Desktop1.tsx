import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import styles from "./css/Desktop1.module.css";
import { useNavigate } from "react-router-dom";


export const Desktop1: FunctionComponent = () => {

 
  return (

    <div className={styles.desktop1}>
      <div className={styles.frameDiv} />
      <img
        className={styles.unsplashdVcXOkpp3fkIcon}
        alt=""
        src="unsplash_dVcXOkpp3fk.png"
      />
      <div className={styles.cLARITABLEDiv}>
        <span className={styles.cLARITABLETxtSpan}>
          <span className={styles.cLARITABLESpan}>CLARITABLE</span>
          <Button onClick={()=> window.location.href='/desktop-2'}>hi</Button>
          <span className={styles.span}>{` `}</span>
          
        </span>
      </div>
    </div>
  );
};
